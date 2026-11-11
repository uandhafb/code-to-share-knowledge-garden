---
title: modulateHue
tool: hydra
category: modulate
level: beginner
meetups: [2]
summary: Pushes each pixel by how different the second image's colors are.
related: [modulate, hue, modulate-scroll]
author: Uandha Fernandes Barbosa
---

## Signature & defaults

`modulateHue(texture, amount)` · default amount: `1`

## Parameters

- **texture**: the image whose colors push the pixels.
- **amount**: how far, counted in screen pixels. 1 is tiny, so try big numbers like 50 or 100.

Unlike the other modulate functions, it has no twin among the geometry functions.

## Negative values

- **amount**: pushes the other way.

## Sketch

The square bends:

```hydra
shape(4, 0.3, 0.01).modulateHue(osc(10, 0.1, 2), 50).out()
```

## Try this

A bigger push:

```hydra
shape(4, 0.3, 0.01).modulateHue(osc(10, 0.1, 2), 100).out()
```
