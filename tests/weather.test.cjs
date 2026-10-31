const { test } = require("node:test");
const assert = require("node:assert/strict");
const { visualState, validPlace, weatherLabel } = require("../assets/weather.js");

const seconds = (text) => Date.parse(text) / 1000;
const place = { name: "Montréal", latitude: 45.5, longitude: -73.6, timezone: "America/Toronto" };
const weather = (values = {}) => ({
  current: { time: seconds("2026-10-31T16:00Z"), temperature_2m: 12, precipitation: 0, cloud_cover: 0, wind_speed_10m: 0, weather_code: 0, is_day: 1, ...values },
  daily: { time: [seconds("2026-10-31T04:00Z")], sunrise: [seconds("2026-10-31T11:00Z")], sunset: [seconds("2026-10-31T22:00Z")] },
});
const at = (data, time) => visualState(place, data, Date.parse(time));

test("sunrise, day, sunset, and night follow the supplied solar events", () => {
  for (const [time, phase] of [["11:00", "sunrise"], ["16:00", "day"], ["22:00", "sunset"]]) {
    assert.equal(at(weather(), `2026-10-31T${time}Z`).phase, phase);
  }
  const night = at(weather(), "2026-11-01T02:00Z");
  assert.equal(night.phase, "night");
  const brightness = (state) => state.colors.flat().reduce((sum, channel) => sum + channel, 0);
  assert.ok(brightness(at(weather(), "2026-10-31T16:00Z")) > brightness(night) * 2);
});

test("a place across the date boundary uses that place's day, independently of the browser time zone", () => {
  const tokyo = { ...place, name: "Tokyo", timezone: "Asia/Tokyo" };
  const data = weather({ is_day: 0 });
  data.daily = { time: [seconds("2026-10-30T15:00Z")], sunrise: [seconds("2026-10-30T21:00Z")], sunset: [seconds("2026-10-31T08:00Z")] };
  assert.equal(visualState(tokyo, data, Date.parse("2026-10-30T22:30Z")).phase, "day");
});

test("offline clock fallback follows the chosen city's time zone", () => {
  const now = Date.parse("2026-10-31T12:00Z");
  assert.equal(visualState(place, null, now).phase, "day");
  assert.equal(visualState({ ...place, timezone: "Asia/Tokyo" }, null, now).phase, "night");
});

test("palette transitions are continuous across sunrise", () => {
  const before = at(weather(), "2026-10-31T10:59Z");
  const after = at(weather(), "2026-10-31T11:01Z");
  before.colors.flat().forEach((channel, i) => assert.ok(Math.abs(channel - after.colors.flat()[i]) < 0.025));
});

test("temperature shifts color while rain, clouds, and wind control texture and motion", () => {
  const cold = at(weather({ temperature_2m: -15 }), "2026-10-31T16:00Z");
  const warm = at(weather({ temperature_2m: 35 }), "2026-10-31T16:00Z");
  assert.ok(warm.colors[0][0] > cold.colors[0][0]);
  assert.ok(warm.colors[1][2] < cold.colors[1][2]);
  const calm = at(weather(), "2026-10-31T16:00Z");
  const wet = at(weather({ precipitation: 3, cloud_cover: 100, wind_speed_10m: 50 }), "2026-10-31T16:00Z");
  for (const key of ["rain", "clouds", "speed", "warp"]) assert.ok(wet[key] > calm[key], key);
});

test("missing solar events at polar latitudes use the provider's day/night flag", () => {
  for (const is_day of [0, 1]) {
    const data = weather({ is_day });
    data.daily.sunrise = [null];
    data.daily.sunset = [0];
    assert.equal(at(data, "2026-10-31T16:00Z").phase, is_day ? "day" : "night");
  }
});

test("missing values produce a usable, finite fallback instead of treating null as cold weather", () => {
  const data = { current: { temperature_2m: null, precipitation: null, cloud_cover: null, wind_speed_10m: null } };
  const now = Date.parse("2026-10-31T16:00Z");
  assert.deepEqual(visualState(place, data, now), visualState(place, null, now));
  assert.doesNotThrow(() => visualState(place, { ...weather(), daily: { time: "invalid" } }, now));
});

test("saved places require valid coordinates and an actual time zone", () => {
  assert.equal(validPlace(place), true);
  for (const invalid of [null, {}, { ...place, latitude: 95 }, { ...place, longitude: NaN }, { ...place, timezone: "not/a-zone" }, { ...place, name: "" }]) {
    assert.equal(validPlace(invalid), false);
  }
  assert.equal(weatherLabel(61), "rain");
  assert.equal(weatherLabel(73), "snow");
});
