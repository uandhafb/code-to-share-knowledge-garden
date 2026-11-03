---
hidden: true # next week, Meetup #2
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

You only see the first image where the top one is transparent. Most sources are not transparent, so cut the top image with [[luma]] or [[mask]].

## Negative values

- There are no numbers here, so there is nothing to make negative.

## Sketch

```hydra
noise(3).layer(osc(30, 0.1, 2).mask(shape(4, 0.4))).out()
```

## Try this

The bright stripes of one pattern on top of another, cut with [[luma]]:

```hydra
osc(30).layer(osc(15).rotate(1).luma()).out()
```
