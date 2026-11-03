---
title: invert
tool: hydra
category: color
level: beginner
meetups: [1]
summary: Flips the colors, like a photo negative.
related: [contrast, thresh, luma]
author: Uandha Fernandes Barbosa
---

## Signature & defaults

`invert(amount)` · default: `invert(1)`

Every color flips to its opposite: black ↔ white, red ↔ cyan, blue ↔ yellow, green ↔ magenta.

## Parameters

- **amount**: 1 = fully flipped, 0 = normal, 0.5 = halfway, so every color meets in the middle: gray.

## Negative values

- **amount**: the colors are not flipped; the contrast gets much harsher instead.

## Sketch

```hydra
osc(20, 0.1, 1).invert(1).out()
```

## Try this

Dark cells with bright edges become bright cells with dark edges:

```hydra
voronoi(5, 0.3, 1).invert().out()
```
