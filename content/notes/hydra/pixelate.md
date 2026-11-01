---
title: pixelate
tool: hydra
category: geometry
level: beginner
meetups: [1]
summary: Reduces the image resolution for a pixelated effect.
related: [repeat, modulate-pixelate, noise]
author: Uandha Fernandes Barbosa
---

## Signature & defaults

`pixelate(pixelX, pixelY)` · defaults: `pixelate(20, 20)`

## Parameters

- **pixelX** and **pixelY**: how many pixels across and down (fewer = blockier).

## Negative values

- Use positive numbers.

## Sketch

```hydra
noise(4).repeat(10, 10, 0.5, 0.5).pixelate(60, 30).out()
```

## Try this

Very blocky stripes:

```hydra
osc(20, 0.1, 1).pixelate(8, 8).out()
```

Tall pixels:

```hydra
shape(100, 0.4).pixelate(10, 40).out()
```
