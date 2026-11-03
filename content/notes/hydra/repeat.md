---
title: repeat
tool: hydra
category: geometry
level: beginner
meetups: [1]
summary: A grid of copies.
related: [scale, pixelate, modulate-repeat]
author: Uandha Fernandes Barbosa
---

## Signature & defaults

`repeat(repeatX, repeatY, offsetX, offsetY)` · defaults: `repeat(3, 3, 0, 0)`

`repeatX(reps, offset)` and `repeatY(reps, offset)` repeat along one direction only. Their defaults are `3, 0`, and their offset shifts every other column (repeatX) or row (repeatY).

## Parameters

- **repeatX** and **repeatY**: how many copies across and down.
- **offsetX** and **offsetY**: shift every other row or column, like a brick wall.

## Negative values

- **repeatX** and **repeatY**: the same number of copies, each one mirrored.
- **offsetX** and **offsetY**: the shift goes the other way.

## Sketch

```hydra
shape().scale(1.5, 1, -1, -0.3, 0.5).repeat(7, 4, 0.3, 0.5).out()
```

## Try this

A simple grid:

```hydra
shape(4, 0.3).repeat(5, 5).out()
```

A brick wall:

```hydra
shape(4, 0.3).repeat(5, 5, 0.5, 0).out()
```

Copies across only, with every other column shifted:

```hydra
shape(4, 0.3).repeatX(5, 0.5).out()
```

Copies down only, with every other row shifted:

```hydra
shape(4, 0.3).repeatY(5, 0.5).out()
```

Mirrored copies:

```hydra
shape(3, 0.2).repeat(-3, -3).out()
```
