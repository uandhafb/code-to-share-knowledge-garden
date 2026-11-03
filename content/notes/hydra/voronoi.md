---
title: voronoi
tool: hydra
category: source
level: beginner
meetups: [1]
summary: A pattern like giraffe skin or cracked mud.
related: [noise, shape, colorama]
author: Uandha Fernandes Barbosa
---

## Signature & defaults

`voronoi(scale, speed, blending)` · defaults: `voronoi(5, 0.3, 0.3)`

## Parameters

- **scale**: how many pieces the pattern has.
- **speed**: how fast they move.
- **blending**: how soft they look (0 = flat).

## Negative values

- **scale**: mirrored.
- **speed**: the pattern moves in reverse.
- **blending**: brighter toward the edges.

## Sketch

```hydra
voronoi(10, 0.1, -1).out()
```

## Try this

Still and flat, so you can count the cells:

```hydra
voronoi(5, 0, 0).out()
```


A flat pattern:

```hydra
voronoi(5, 0.3, 0).out()
```

Many small pieces, moving fast:

```hydra
voronoi(30, 1, 0.5).out()
```
