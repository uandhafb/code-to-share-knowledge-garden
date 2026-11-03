---
title: scroll
tool: hydra
category: geometry
level: beginner
meetups: [1]
summary: Moves the image. It wraps around the edges, like Pac-Man.
related: [rotate, repeat, modulate]
author: Uandha Fernandes Barbosa
---

## Signature & defaults

`scroll(scrollX, scrollY, speedX, speedY)` · defaults: `scroll(0.5, 0.5, 0, 0)`

`scrollX(scrollX, speed)` and `scrollY(scrollY, speed)` move along one direction only.

## Parameters

- **scrollX** and **scrollY**: how far to move sideways and up or down.
- **speedX** and **speedY**: keep it moving.

## Negative values

- Every parameter: moves the other way.

## Sketch

```hydra
noise(10, 1).scroll(-0.3, 0.2, 0.3, 0.3).rotate(3, 1).out()
```

## Try this

The scroll amount can be an [[arrays|array]], so the triangle jumps between two places:

```hydra
shape(3, 0.2).scale(0.7, 1, -1, 1.7, 0.39).scroll([-0.27, 0.99], 0.01).out()
```

A square sliding sideways forever:

```hydra
shape(4, 0.2).scrollX(0, 0.1).out()
```

A triangle sliding up or down forever (a negative speed goes the other way):

```hydra
shape(3, 0.3).scrollY(0, -0.1).out()
```
