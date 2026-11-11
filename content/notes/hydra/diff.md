---
title: diff
tool: hydra
category: blend
level: beginner
meetups: [2]
summary: Shows the difference between two images.
related: [sub, add, kaleid]
author: Uandha Fernandes Barbosa
---

## Signature & defaults

`diff(texture)`

## Parameters

- **texture**: the second image: a source, a chain, or an output like `o1`.

Where the two images are the same, the result is black. Where they are very different, it gets bright. The math is |A − B|, always positive, so `A.diff(B)` looks the same as `B.diff(A)`. Where the second image is black, the first doesn't change; where it's white, the first is inverted. It's great for sharp edges and strobing effects.

## Negative values

- There are no numbers here, so there is nothing to make negative.

## Sketch

```hydra
osc(9, 0.1, 1).diff(osc(13, 0.5, 5)).out()
```

## Try this

Slow color waves minus a breathing, spinning kaleidoscope:

```hydra
osc(1, 1, 2).diff(shape(6, 1.1, 0.01).scale(() => Math.sin(time) * 0.05 + 0.9).kaleid(15).rotate(() => time % 360)).out()
```

The stripes are inverted only inside the square:

```hydra
osc(10, 0.1, 1).diff(shape(4, 0.4)).out()
```

Two almost-equal sets of stripes make slow-moving bands:

```hydra
osc(10, 0.1, 1).diff(osc(11, 0.1, 1)).out()
```
