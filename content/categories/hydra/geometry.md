---
title: Geometry
order: 2
summary: Transformations that zoom, copy, turn, slide, mirror and pixelate the image.
notes: [scale, repeat, rotate, scroll, kaleid, pixelate]
---

Geometry functions move the image around. They go after a source and before `.out()`, and you can chain as many as you like. Each one works on the result of the one before it, so the order changes the result.

## The order matters

The same functions in a different order. Swap `rotate` and `repeat`, and compare:

```hydra
shape(4, 0.2).repeat(3, 3).rotate(0, 0.1).kaleid(5).out()
```

```hydra
shape(4, 0.2).rotate(0, 0.1).repeat(3, 3).kaleid(5).out()
```
