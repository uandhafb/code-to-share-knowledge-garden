---
title: modulate
tool: hydra
category: modulate
level: beginner
meetups: [2]
summary: Wavy glass: a second image pushes the pixels around.
related: [modulate-rotate, scroll, noise]
author: Uandha Fernandes Barbosa
---

## Signature & defaults

`modulate(texture, amount)` · default amount: `0.1`

## Parameters

- **texture**: the image that controls the effect. Bright parts move pixels more.
- **amount**: how strong the warping is (0.01 = subtle, 1 = wild).

Geometry like `rotate(0.5)` moves every pixel by the same amount. Modulate lets the second image decide, pixel by pixel, which makes liquid, organic, glitchy distortions. It's like FM in a synth, but for images.

## Negative values

- **amount**: pushes the pixels the other way.

## Sketch

```hydra
shape(4, 0.4).modulate(noise(3), 0.3).out()
```

## Try this

Stripes bent by other stripes:

```hydra
osc(20, 0.1, 1).modulate(osc(5, 0.1), 0.5).out()
```

An organic warp:

```hydra
osc(10, 0.1, 1).modulate(noise(3), 0.1).out()
```

The second image doesn't move, so the warp is frozen:

```hydra
osc(10, 0.1, 1).modulate(osc(30, 0), 0.5).out()
```
