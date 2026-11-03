---
hidden: true # next week, Meetup #2
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
- **amount**: how strong the effect is.

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
