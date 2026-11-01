---
title: osc
tool: hydra
category: source
level: beginner
meetups: [1]
summary: The striped pattern.
related: [noise, kaleid, color]
author: Uandha Fernandes Barbosa
---

## Signature & defaults

`osc(frequency, sync, offset)` · defaults: `osc(60, 0.1, 0)`

## Parameters

- **frequency**: how many stripes.
- **sync**: how fast they move sideways (0 = still).
- **offset**: how much color (0 = black and white).

## Negative values

- **frequency**: light and dark swap places (inverted). This is easier to see at a low frequency.
- **sync**: the stripes move the other way.
- **offset**: red and blue swap.

## Sketch

```hydra
osc(-10, 0, 0).out()
```

## Try this

Turn the color and the movement on:

```hydra
osc(10, 0.1, 1).out()
```

Many thin stripes, frozen:

```hydra
osc(200, 0, 0).out()
```
