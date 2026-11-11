---
title: luma
tool: hydra
category: color
level: beginner
meetups: [2]
summary: Keeps the bright parts and makes the dark parts transparent.
related: [layer, thresh, mask]
author: Uandha Fernandes Barbosa
---

## Signature & defaults

`luma(threshold, tolerance)` · defaults: `luma(0.5, 0.1)`

## Parameters

- **threshold**: only the parts brighter than this stay. The rest becomes transparent.
- **tolerance**: how soft the cut is (0 = sharp edge).

Use luma on the top image of a [[layer]], so the image below shows through the dark parts. Compare it with [[thresh]], which is not transparent.

## Negative values

- Not useful: stick to numbers between 0 and 1.

## Sketch

```hydra
osc(30).layer(osc(15).rotate(1).luma()).out()
```

## Try this

A lower threshold keeps more of the top image:

```hydra
osc(30).layer(osc(15).rotate(1).luma(0.2, 0.1)).out()
```
