---
title: Blend
order: 4
summary: Mix two images together.
notes: [add, sub, layer, blend, mult, diff, mask]
---

Blend functions take a second image as their first parameter (see the [[category:hydra/source#rules-for-every-function|rules]]) and mix it with the image before them.

`imageA.blendFunction(imageB, amount).out()`, for example `osc().add(noise(), 0.5).out()`:

- Image A is the one you start with, before the dot.
- Image B goes inside the parentheses: any source, or a whole chain.
- The amount is how much of the mix, usually from 0 to 1.

Think of these as the mixer of your modular synth.

| Function (defaults) | The math | What you see |
|---|---|---|
| `add(B, 1)` | A + B | like two projectors on one wall: brighter |
| `sub(B, 1)` | A − B | B's light is taken away: darker (careful with [[sub\|transparency]]) |
| `mult(B, 1)` | A × B | a stencil: black in B hides A |
| `diff(B)` | \|A − B\| | where A and B are the same: black |
| `blend(B, 0.5)` | a crossfade | like a DJ mixer: 0 = A, 1 = B |
| `layer(B)` | B on top | like a sticker: A shows through B's transparent parts |

## Chaining several

You can keep mixing in more images:

```hydra
osc(20, 0.1, 1).add(noise(3)).mult(voronoi(5)).out()
```

Each `blend(…, 0.5)` keeps half of what came before, so the earlier images fade the most.
