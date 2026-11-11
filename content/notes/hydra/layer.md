---
title: layer
tool: hydra
category: blend
level: beginner
meetups: [2]
summary: Puts a second image on top, like a sticker.
related: [mask, luma, solid]
author: Uandha Fernandes Barbosa
---

## Signature & defaults

`layer(texture)`

## Parameters

- **texture**: the image to put on top: a source, a chain, or an output like `o1`.

You only see the first image where the top one is transparent. Most sources are not transparent, so cut the top image with [[luma]]: its dark parts become transparent.

## Negative values

- There are no numbers here, so there is nothing to make negative.

## Sketch

A green hexagon on a red square:

```hydra
shape(4, 0.3, 0.01).color(1, 0, 0).layer(shape(6, 0.2, 0.01).color(0, 1, 0).luma()).out()
```

## Try this

The bright stripes of one pattern on top of another, cut with [[luma]]:

```hydra
osc(30).layer(osc(15).rotate(1).luma()).out()
```
