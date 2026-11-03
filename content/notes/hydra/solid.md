---
title: solid
tool: hydra
category: source
level: beginner
meetups: [1]
summary: One flat color for the whole screen.
related: [color, layer, gradient]
author: Uandha Fernandes Barbosa
---

## Signature & defaults

`solid(r, g, b, a)` · defaults: `solid(0, 0, 0, 1)`

`solid()` with nothing is black, so it's a quick way to clear the screen.

## Parameters

- **r**, **g** and **b**: how much red, green and blue: 0 none, 1 full.
- **a**: alpha (how opaque).

## Negative values

- On screen, a negative value shows as 0 (no color).

## Sketch

```hydra
solid(1, 0, 0.5).out()
```

## Try this

Each value can be an [[arrays|array]]. Here red, green and blue take turns:

```hydra
solid([1, 0, 0], [0, 1, 0], [0, 0, 1]).out()
```

A dark blue background with a striped square on top (see [[layer]] and [[mask]]):

```hydra
solid(0, 0, 0.3).layer(osc(30, 0.1, 2).mask(shape(4, 0.4))).out()
```
