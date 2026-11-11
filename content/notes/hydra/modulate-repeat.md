---
title: modulateRepeat
tool: hydra
category: modulate
level: beginner
meetups: [2]
summary: Copies of the image, shifted by a second image.
related: [repeat, modulate, modulate-kaleid]
author: Uandha Fernandes Barbosa
---

## Signature & defaults

`modulateRepeat(texture, repeatX, repeatY, offsetX, offsetY)` · defaults: `3, 3, 0.5, 0.5`

`modulateRepeatX(texture, reps, offset)` and `modulateRepeatY(texture, reps, offset)` work in one direction only. Their defaults are `3, 0.5`.

## Parameters

- **texture**: the image that shifts the copies.
- **repeatX** and **repeatY**: how many copies across and down.
- **offsetX** and **offsetY**: how much the second image shifts them.

## Negative values

- **offsetX** and **offsetY**: shift the other way.

## Sketch

```hydra
shape(4, 0.4).modulateRepeat(noise(3)).out()
```

## Try this

The second image can have its own transformations (see [[chaining]]):

```hydra
shape(4, 0.4).modulateRepeat(noise(17).rotate(3)).colorama(-10).out()
```

A neat grid, then the same grid scattered by noise:

```hydra
shape(4, 0.3, 0.01).repeat(3, 3).out()
```

```hydra
shape(4, 0.3, 0.01).modulateRepeat(noise(2), 3, 3, 0.5, 0.5).out()
```

Columns pushed up and down:

```hydra
shape(4, 0.3, 0.01).modulateRepeatX(noise(2), 3, 0.5).out()
```
