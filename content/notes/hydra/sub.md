---
title: sub
tool: hydra
category: blend
level: beginner
meetups: [1, 2]
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

**Careful with transparency.** Every image has an invisible fourth value, its transparency (alpha). `osc` and `shape` are fully visible (alpha = 1), and `sub` takes that away too: 1 − 1 = 0, so the image can become invisible, and in the Hydra editor you only see black:

```javascript
osc(10, 0.1, 1).sub(shape(4, 0.4)).out() // all black in the Hydra editor
```

`.color(1, 1, 1, 0)` keeps the second image's colors but sets its alpha to 0, so nothing is taken from the transparency. That's why the sketch below cuts a clean black square hole.

## Negative values

- **amount**: adds the second image instead of subtracting it.

## Sketch

```hydra
osc(10, 0.1, 1).sub(shape(4, 0.4).color(1, 1, 1, 0)).out()
```

## Try this

Two sets of stripes subtracted from each other:

```hydra
osc().sub(osc(6).color(1, 1, 1, 0)).out()
```

Take away only a little:

```hydra
osc(20, 0.1, 1).sub(shape(4, 0.4).color(1, 1, 1, 0), 0.5).out()
```
