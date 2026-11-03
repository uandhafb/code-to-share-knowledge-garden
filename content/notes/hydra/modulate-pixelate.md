---
hidden: true # next week, Meetup #2
title: modulatePixelate
tool: hydra
category: modulate
level: beginner
meetups: [2]
summary: The second image decides how blocky each part is.
related: [pixelate, modulate, noise]
author: Uandha Fernandes Barbosa
---

## Signature & defaults

`modulatePixelate(texture, multiple, offset)` · defaults: multiple `10`, offset `3`

## Parameters

- **texture**: the image that controls the pixel size.
- **multiple**: how many more pixels the bright parts get (smaller blocks).
- **offset**: how many pixels the dark parts get.

## Negative values

- **multiple**: the bright parts get bigger blocks instead of smaller ones.

## Sketch

```hydra
osc(20, 0.1, 1).modulatePixelate(noise(3), 10).out()
```

## Try this

```hydra
shape(100, 0.4).modulatePixelate(osc(10, 0.1), 40, 5).out()
```
