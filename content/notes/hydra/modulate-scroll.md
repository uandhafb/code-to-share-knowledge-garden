---
title: modulateScrollX
tool: hydra
category: modulate
level: beginner
meetups: [2]
summary: A second image pushes each part sideways, or up and down.
related: [scroll, modulate, modulate-rotate]
author: Uandha Fernandes Barbosa
---

## Signature & defaults

`modulateScrollX(texture, scrollX, speed)` and `modulateScrollY(texture, scrollY, speed)` · defaults: `0.5, 0`

## Parameters

- **texture**: the image that decides how far each part is pushed.
- **scrollX** or **scrollY**: how far the second image pushes the image.
- **speed**: keeps it moving.

Compare it with [[scroll]], which moves every pixel by the same amount.

## Negative values

- **scrollX** and **scrollY**: push the other way.

## Sketch

A square whose sides melt sideways:

```hydra
shape(4, 0.3, 0.01).modulateScrollX(noise(2), 0.1).out()
```

## Try this

The top and bottom turn wavy:

```hydra
shape(4, 0.3, 0.01).modulateScrollY(noise(2), 0.1).out()
```

Pushing vertical stripes up and down would be invisible, so this uses cells:

```hydra
voronoi(5, 0.3, 1).modulateScrollY(osc(5), 0.5).out()
```
