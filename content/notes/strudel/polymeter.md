---
title: "polymeter { }"
tool: strudel
category: mini-notation
level: beginner
meetups: [1]
summary: Layers with equal steps that drift apart.
related: [layers, nest, sequence]
author: Uandha Fernandes Barbosa
---

## How it works

**Polyrhythm `[ , ]`:** every layer is squeezed into one cycle, so the steps have different lengths. Three steps play against two, and every cycle sounds the same:

```text
|      jazz       |      casio      |       rim       |
|            hh            |            lt            |
```

**Polymeter `{ , }`:** every step has the same length. The first layer sets the step size, and the other layers keep looping at their own length, so they drift. Here, there are two steps per cycle, so `lt bd sd` needs three cycles to come back around. Every cycle is different, and cycle 4 starts again like cycle 1:

```text
 cycle 1      cycle 2      cycle 3
| hh | cp |  | hh | cp |  | hh | cp |
| lt | bd |  | sd | lt |  | bd | sd |
```

## Example

```strudel
s("{hh cp, lt bd sd}")
```

## Try this

Compare with the polyrhythm:

```strudel
s("[jazz casio rim, hh lt]")
```
