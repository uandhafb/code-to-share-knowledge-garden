---
hidden: true # not in a meetup yet
title: src
tool: hydra
category: source
level: beginner
meetups: []
summary: Starts from an image that already exists.
related: [out, modulate, blend]
author: Uandha Fernandes Barbosa
---

## Signature & defaults

`src(texture)`

Instead of making a new image, `src` starts from one that is already there.

## Parameters

- **texture**: an output (`o0`, `o1`, `o2`, `o3`) or an external source (`s0`, `s1`, `s2`, `s3`).

In the Hydra editor, an external source can be a webcam, an image or a video. In this garden, `s0` already holds the LAÇO title.

## Negative values

- There are no numbers here, so there is nothing to make negative.

## Sketch

```hydra
src(s0).modulate(noise(3), 0.05).out()
```

## Try this

Feedback: `src(o0)` inside `.out(o0)` makes the image feed itself, again and again. It builds on whatever is already on the screen, so the result depends on what ran before:

```hydra
src(o0).modulate(noise(3), 0.005).blend(shape(4), 0.01).out(o0)
```
