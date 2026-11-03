---
hidden: true # next week, Meetup #2
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
