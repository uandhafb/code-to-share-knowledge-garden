---
title: modulateScale
tool: hydra
category: modulate
level: beginner
meetups: [2]
summary: Each pixel zooms as much as the second image is bright.
related: [scale, modulate, modulate-rotate]
author: Uandha Fernandes Barbosa
---

## Signature & defaults

`modulateScale(texture, multiple, offset)` · defaults: multiple `1`, offset `1`

## Parameters

- **texture**: the image that controls the zoom.
- **multiple**: how much the brightness zooms each pixel.
- **offset**: the zoom everywhere (1 = none).

## Negative values

- **multiple**: zooms the other way, and can flip the image.

## Sketch

```hydra
shape(4, 0.4).modulateScale(noise(3), 1).out()
```

## Try this

```hydra
osc(20, 0.1, 1).modulateScale(osc(4, 0.1), 2).out()
```

Zoomed only inside the square:

```hydra
osc(10, 0.1, 1).modulateScale(shape(4, 0.3, 0.01), 3).out()
```
