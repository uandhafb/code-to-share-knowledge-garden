---
title: color
tool: hydra
category: color
level: beginner
meetups: [1, 2]
summary: How much of each color channel to keep.
related: [colorama, osc, mult]
author: Uandha Fernandes Barbosa
---

## Signature & defaults

`color(r, g, b, a)` · defaults: `color(1, 1, 1, 1)`

Think of three volume knobs: one for red, one for green, and one for blue.

## Parameters

- **r**, **g** and **b**: how much red, green and blue to keep: 0 none, 1 normal, 2 extra.
- **a**: alpha (how opaque).

## Negative values

- Each one inverts that channel.

## Sketch

```hydra
noise(4).repeat(10, 10, 0.5, 0.5).pixelate(60, 30).color(2, 3, -2).out()
```

## Try this

Keep only the red:

```hydra
osc(20, 0.1, 0).color(1, 0, 0).out()
```

A little green and full blue make light blue stripes:

```hydra
osc(20, 0.1, 0).color(0, 0.5, 1).out()
```

A cyan square:

```hydra
shape(4, 0.4).color(0, 1, 1).out()
```

Warm, orange clouds:

```hydra
noise(3).color(1, 0.5, 0).out()
```
