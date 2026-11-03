---
hidden: true # next week, Meetup #2
title: contrast
tool: hydra
category: color
level: beginner
meetups: [2]
summary: Makes the darks darker and the lights lighter.
related: [brightness, thresh, invert]
author: Uandha Fernandes Barbosa
---

## Signature & defaults

`contrast(amount)` · default: `contrast(1.6)`

## Parameters

- **amount**: 1 = normal, higher = more contrast, 0 = flat gray.

## Negative values

- **amount**: more contrast and inverted colors at the same time.

## Sketch

```hydra
noise(3).contrast(4).out()
```

## Try this

Contrast that keeps changing (see [[arrow-functions]]):

```hydra
osc(20).contrast(() => Math.sin(time) * 5).out()
```
