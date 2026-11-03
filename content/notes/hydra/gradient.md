---
title: gradient
tool: hydra
category: source
level: beginner
meetups: [1]
summary: A smooth blend of colors across the screen.
related: [solid, posterize, scroll]
author: Uandha Fernandes Barbosa
---

## Signature & defaults

`gradient(speed)` · default: `gradient(0)`

From left to right, the red grows. From top to bottom, the green grows.

## Parameters

- **speed**: how fast the blue fades in and out (0 = still).

## Negative values

- **speed**: it looks almost the same; the blue just comes in at a different moment.

## Sketch

```hydra
gradient(1).out()
```

## Try this

The speed can be an [[arrays|array]], so it changes in a loop:

```hydra
gradient([1, 2, 4]).out()
```

Cut the gradient into flat steps with [[posterize]]:

```hydra
gradient(0).posterize(5, 0.5).out()
```
