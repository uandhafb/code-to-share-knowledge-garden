---
hidden: true # next week, Meetup #2
title: r, g, b
tool: hydra
category: color
level: beginner
meetups: [2]
summary: Keeps only one color channel, in black and white.
related: [color, layer, gradient]
author: Uandha Fernandes Barbosa
---

## Signature & defaults

`r(scale, offset)`, `g(scale, offset)` and `b(scale, offset)` · defaults: `r(1, 0)`

## Parameters

- **scale**: how strong the channel is.
- **offset**: adds light everywhere.

`r()` keeps only the red, `g()` only the green and `b()` only the blue. The result is black and white, and it also sets the transparency, so it works well with [[layer]].

## Negative values

- **scale**: on its own, the image goes black. With an offset of 1, the channel is inverted: `r(-1, 1)`.

## Sketch

```hydra
osc(60, 0.1, 1.5).r().out()
```

## Try this

The red of a [[gradient]] used as a see-through layer on top of stripes:

```hydra
osc(60, 0.1, 1.5).layer(gradient().r()).out()
```
