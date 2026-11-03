---
hidden: true # next week, Meetup #2
title: saturate
tool: hydra
category: color
level: beginner
meetups: [2]
summary: How strong the colors are.
related: [hue, color, colorama]
author: Uandha Fernandes Barbosa
---

## Signature & defaults

`saturate(amount)` · default: `saturate(2)`

## Parameters

- **amount**: 0 = black and white, 1 = normal, 2 or more = extra intense.

## Negative values

- **amount**: the opposite colors.

## Sketch

```hydra
osc(10, 0.1, 1).saturate(4).out()
```

## Try this

The same stripes in black and white:

```hydra
osc(10, 0.1, 1).saturate(0).out()
```
