---
hidden: true # next week, Meetup #2
title: modulateRotate
tool: hydra
category: modulate
level: beginner
meetups: [2]
summary: Each pixel turns as much as the second image is bright.
related: [rotate, modulate, modulate-scale]
author: Uandha Fernandes Barbosa
---

## Signature & defaults

`modulateRotate(texture, multiple, offset)` · defaults: multiple `1`, offset `0`

## Parameters

- **texture**: the image that controls the rotation.
- **multiple**: how much the brightness turns each pixel.
- **offset**: a rotation added everywhere, like `rotate`.

## Negative values

- **multiple** and **offset**: turn the other way.

## Sketch

```hydra
shape(4, 0.4).modulateRotate(noise(3), 1).out()
```

Compare it with [[rotate]], which turns every pixel by the same amount.

## Try this

```hydra
osc(20, 0.1, 1).modulateRotate(osc(3), 2).out()
```
