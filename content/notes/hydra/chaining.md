---
title: Chaining images
tool: hydra
category: patterns
level: beginner
meetups: [1]
summary: Images inside other images can have their own transformations.
related: [arrays, arrow-functions, mult]
author: Uandha Fernandes Barbosa
---

## How it works

The second image of a blend function, like [[mult]] or [[add]], is a full chain too, so it can have its own transformations. Read the line like a recipe: left to right, one step after another.

## Sketch

```hydra
osc(20, 0.1, 1).mult(shape(4, 0.3).repeat(7, 3)).out()
```

## Try this

```hydra
osc(20, 0.1, 1).add(shape(3, 0.3).repeat(4, 4).rotate(0, 0.2), 0.5).out()
```
