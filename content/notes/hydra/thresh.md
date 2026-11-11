---
hidden: true # not in a meetup yet
title: thresh
tool: hydra
category: color
level: beginner
meetups: []
summary: Turns the image into pure black and white.
related: [luma, contrast, posterize]
author: Uandha Fernandes Barbosa
---

## Signature & defaults

`thresh(threshold, tolerance)` · defaults: `thresh(0.5, 0.04)`

## Parameters

- **threshold**: the parts brighter than this become white, and the darker parts become black.
- **tolerance**: how soft the cut is (0 = sharp edge).

Unlike [[luma]], thresh is not transparent: the dark parts are really black.

## Negative values

- Not useful: stick to numbers between 0 and 1.

## Sketch

```hydra
noise(3, 0.1).thresh(0.2, 0.04).out()
```

## Try this

Compare with [[luma]]: here the stripes below are covered by the black parts:

```hydra
osc(30).layer(osc(15).rotate(1).thresh()).out()
```
