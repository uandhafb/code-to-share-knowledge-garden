---
hidden: true # not in a meetup yet
title: shift
tool: hydra
category: color
level: beginner
meetups: []
summary: Pushes each color channel by a set amount.
related: [color, hue, colorama]
author: Uandha Fernandes Barbosa
---

## Signature & defaults

`shift(r, g, b, a)` · defaults: `shift(0.5, 0, 0, 0)`

## Parameters

- **r**, **g**, **b** and **a**: how much to push red, green, blue and alpha.

Only the part after the decimal point counts: 1 is the same as 0, and 1.2 is the same as 0.2.

## Negative values

- They wrap around: -0.2 is the same as 0.8.

## Sketch

```hydra
osc(20, 0.1, 1).shift(0.1, 0.9, 0.3).out()
```

## Try this

The black background takes the color, and the white square stays white:

```hydra
shape(4, 0.4).shift(0.2, 0.6, 0.9).out()
```
