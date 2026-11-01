---
title: shape
tool: hydra
category: source
level: beginner
meetups: [1]
summary: A geometric shape.
related: [scale, repeat, rotate]
author: Uandha Fernandes Barbosa
---

## Signature & defaults

`shape(sides, radius, smoothing)` · defaults: `shape(3, 0.3, 0.01)`

## Parameters

- **sides**: 3 is a triangle, 4 a square, 30 or more a circle.
- **radius**: the size.
- **smoothing**: how blurry the edge is.

## Negative values

- **radius**: the shape usually disappears.
- **sides** and **smoothing**: nothing useful.

## Sketch

```hydra
shape(100, 0.5, 0.005).out()
```

## Try this

A perfect circle. The screen is a rectangle, but Hydra treats it as a square, so circles look stretched. Scaling by the screen's height divided by its width fixes it (the canvas here fills the window, so this works as written):

```hydra
shape(100, 0.3, 0.005).scale(1, () => window.innerHeight / window.innerWidth).out()
```

A square with a soft edge:

```hydra
shape(4, 0.3, 0.3).out()
```
