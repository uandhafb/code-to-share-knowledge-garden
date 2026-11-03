---
hidden: true # next week, Meetup #2
title: posterize
tool: hydra
category: color
level: beginner
meetups: [2]
summary: Fewer color steps, like a printed poster.
related: [pixelate, gradient, thresh]
author: Uandha Fernandes Barbosa
---

## Signature & defaults

`posterize(bins, gamma)` · defaults: `posterize(3, 0.6)`

## Parameters

- **bins**: how many color steps (fewer = flatter).
- **gamma**: where the steps fall. Smaller values put more steps in the dark parts.

[[pixelate]] makes fewer pixels; posterize makes fewer colors.

## Negative values

- Not useful: stick to positive numbers.

## Sketch

```hydra
osc(4, 0.1, 1.2).posterize(3, 0.6).out()
```

## Try this

The number of steps changes in a loop:

```hydra
gradient(0).posterize([1, 5, 15, 30], 0.5).out()
```
