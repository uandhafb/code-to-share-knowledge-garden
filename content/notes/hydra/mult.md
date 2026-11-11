---
title: mult
tool: hydra
category: blend
level: beginner
meetups: [1, 2]
summary: Multiplies two images: darker, like a stencil.
related: [add, blend, shape]
author: Uandha Fernandes Barbosa
---

## Signature & defaults

`mult(texture, amount)` · default amount: `1`

## Parameters

- **texture**: the second image: a source, a chain, or an output like `o1`.
- **amount**: how strong the effect is (1 = full).

The result gets darker, like a stencil: where the second image is white, the first shows through as it is; where it's black, the first disappears. Gray makes the first image darker, and color tints it.

## Negative values

- **amount**: the effect flips: the first image gets brighter where the second one is dark.

## Sketch

```hydra
osc(20, 0.1, 1).mult(shape(100, 0.4)).out()
```

## Try this

Stripes seen through a grid of squares:

```hydra
osc(20, 0.1, 1).mult(shape(4, 0.3).repeat(7, 3)).out()
```

A colored second image tints the first:

```hydra
osc(20, 0.1, 0).mult(osc(3, 0.1, 2)).out()
```

Stripes only where the clouds are:

```hydra
osc(10, 0.1, 1).mult(noise(3), 1).out()
```
