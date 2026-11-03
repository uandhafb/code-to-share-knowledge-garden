---
title: Arrays
tool: hydra
category: patterns
level: beginner
meetups: [1]
summary: Give a list of values, and Hydra plays them one after another.
related: [arrow-functions, chaining, scroll]
author: Uandha Fernandes Barbosa
---

## How it works

Put a list of values in `[ ]` instead of a number, and Hydra plays them one after another, in a loop. By default each value lasts 2 seconds.

- `.fast()` changes the speed: `fast(2)` is twice as fast, `fast(0.5)` half as fast.
- `.smooth()` glides between the values instead of jumping.

## Sketch

```hydra
shape(4, [0.1, 0.4].smooth()).out()
```

## Try this

A shape that changes its number of sides, then the same list four times as fast:

```hydra
shape([3, 4, 5, 6]).out()
```

```hydra
shape([3, 4, 5, 6].fast(4)).out()
```


Arrays for color: the red and blue channels swap every 2 seconds:

```hydra
osc(20, 0.1, 1).color([1, 0], 0, [0, 1]).out()
```

A pattern of movements, at half speed:

```hydra
osc(10, [0, 0.125, -0.25, 0.5, -0.25, 0.125].fast(0.5), 1).out()
```
