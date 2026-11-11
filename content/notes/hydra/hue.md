---
title: hue
tool: hydra
category: color
level: beginner
meetups: [1, 2]
summary: Turns every color around the color wheel.
related: [colorama, saturate, shift]
author: Uandha Fernandes Barbosa
---

## Signature & defaults

`hue(hue)` · default: `hue(0.4)`

## Parameters

- **hue**: how far to turn the colors around the wheel (red → orange → yellow → green → blue → purple → red). 0.5 is half a turn, to the opposite colors; 1 is a full turn, back to the original colors.

`hue` only changes **which** color it is, not how bright or how strong: 0.33 turns red into green, and 0.66 turns red into blue. Black, white, and gray have no color to turn, so `hue` doesn't change them.

**hue or [[colorama]]?** hue only turns the colors, cleanly. colorama also changes how strong and how bright they are, so it gets wild.

## Negative values

- **hue**: the colors turn the other way.

## Sketch

```hydra
osc(30, 0.1, 1).hue(0.5).out()
```

## Try this

Colors that keep turning back and forth (see [[arrow-functions]]):

```hydra
osc(30, 0.1, 1).hue(() => Math.sin(time)).out()
```

On black-and-white noise, `hue` does nothing (compare with [[colorama]]):

```hydra
noise(3).hue(0.5).out()
```

The colors keep traveling around the wheel:

```hydra
osc(10, 0.1, 1).hue(() => time * 0.1).out()
```
