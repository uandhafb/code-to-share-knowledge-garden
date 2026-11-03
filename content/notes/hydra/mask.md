---
hidden: true # next week, Meetup #2
title: mask
tool: hydra
category: blend
level: beginner
meetups: [2]
summary: Shows the first image only where the second one is bright.
related: [mult, layer, luma]
author: Uandha Fernandes Barbosa
---

## Signature & defaults

`mask(texture)`

## Parameters

- **texture**: the second image: a source, a chain, or an output like `o1`.

It works like [[mult]], but the dark parts become transparent instead of black. That's why mask works so well inside [[layer]].

## Negative values

- There are no numbers here, so there is nothing to make negative.

## Sketch

```hydra
osc().layer(osc(30, 0.1, 2).mask(shape(4))).out()
```

## Try this

The same code with [[mult]] instead: the dark part is black, so it covers the stripes below:

```hydra
osc().layer(osc(30, 0.1, 2).mult(shape(4))).out()
```
