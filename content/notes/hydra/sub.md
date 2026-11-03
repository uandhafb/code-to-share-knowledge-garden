---
title: sub
tool: hydra
category: blend
level: beginner
meetups: [1]
summary: Subtracts one image from another: darker, the opposite of add.
related: [add, diff, mult]
author: Uandha Fernandes Barbosa
---

## Signature & defaults

`sub(texture, amount)` · default amount: `1`

## Parameters

- **texture**: the second image: a source, a chain, or an output like `o1`.
- **amount**: how much of the second image is subtracted.

The result gets darker. Where the second image is black, nothing changes; where it's bright, the first one disappears. It is the opposite of [[add]].

## Negative values

- **amount**: adds the second image instead of subtracting it.

## Sketch

```hydra
osc(20, 0.1, 1).sub(shape(4, 0.4)).out()
```

## Try this

Two sets of stripes subtracted from each other:

```hydra
osc().sub(osc(6)).out()
```

Take away only a little:

```hydra
osc(20, 0.1, 1).sub(shape(4, 0.4), 0.1).out()
```
