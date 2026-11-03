---
title: Blend
order: 4
summary: Mix two images together.
notes: [add, sub, layer, blend, mult, diff, mask]
---

Blend functions take a second image as their first parameter (see the [[category:hydra/source#rules-for-every-function|rules]]) and mix it with the image before them.

## Chaining several

You can keep mixing in more images:

```hydra
osc(20, 0.1, 1).add(noise(3)).mult(voronoi(5)).out()
```

Each `blend(…, 0.5)` keeps half of what came before, so the earlier images fade the most.
