---
title: add
tool: hydra
category: blend
level: beginner
meetups: [1]
summary: Two projectors on one wall: the result gets brighter.
related: [blend, mult, modulate]
author: Uandha Fernandes Barbosa
---

## Signature & defaults

`add(texture, amount)` · default amount: `1`

## Parameters

- **texture**: the second image: a source, a chain, or an output like `o1`. It has no default; you always give one.
- **amount**: how much of the second image to add (1 = all of it).

Like two projectors pointed at the same wall, the light adds up. Where the second image is black, nothing changes; where it's bright, the first image gets brighter, up to white.

## Negative values

- **amount**: subtracts the second image instead, so the result gets darker.

## Sketch

```hydra
osc(20, 0.1, 1).add(shape(4, 0.4), 0.5).out()
```

## Try this

Add all of the noise:

```hydra
osc(20, 0.1, 1).add(noise(3), 1).out()
```

Cut a square out by subtracting it:

```hydra
osc(20, 0.1, 1).add(shape(4, 0.4), -1).out()
```
