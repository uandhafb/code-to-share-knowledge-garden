---
title: modulateKaleid
tool: hydra
category: modulate
level: beginner
meetups: [2]
summary: A kaleidoscope bent by a second image.
related: [kaleid, modulate, osc]
author: Uandha Fernandes Barbosa
---

## Signature & defaults

`modulateKaleid(texture, nSides)` · default nSides: `4`

## Parameters

- **texture**: the image that bends the slices.
- **nSides**: how many mirrored slices, like [[kaleid]]. The second image bends the kaleidoscope, so the mirrors melt.

## Negative values

- Use positive numbers.

## Sketch

```hydra
shape(4, 0.4).modulateKaleid(osc(3), 4).out()
```

## Try this

```hydra
osc(20, 0.1, 1).modulateKaleid(noise(2), 6).out()
```

Many melting slices:

```hydra
osc(10, 0.1, 1).modulateKaleid(osc(11, 0.5, 0), 50).out()
```
