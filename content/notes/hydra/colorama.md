---
title: colorama
tool: hydra
category: color
level: beginner
meetups: [1]
summary: Shifts every color around the color wheel.
related: [color, osc, voronoi]
author: Uandha Fernandes Barbosa
---

## Signature & defaults

`colorama(amount)` · defaults: `colorama(0.005)`

## Parameters

- **amount**: how far to shift. Small (0.01) = a gentle shift; bigger (0.5) = wild rainbow bands.

Like [[hue]], colorama turns the colors, but it also pushes how strong and how bright they are. When they go too far, they wrap around, which makes the rainbow bands.

## Negative values

- **amount**: shifts the other way.

## Sketch

```hydra
noise(4).repeat(10, 10, 0.5, 0.5).pixelate(60, 30).colorama(-0.5).out()
```

## Try this

```hydra
osc(20, 0.1, 1).colorama(0.2).out()
```

On black-and-white noise, colors appear (`hue` would change nothing):

```hydra
noise(3).colorama(0.5).out()
```

```hydra
voronoi(5).colorama(1).out()
```
