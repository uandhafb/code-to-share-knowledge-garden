---
title: gain
tool: strudel
category: effects
level: beginner
meetups: [1, 2]
summary: Sets the volume.
related: [pan, room, degrade-by]
author: Uandha Fernandes Barbosa
---

## How it works

0 is silent, 0.8 is the default, and 1 is louder. The value can be a pattern, so each sound can have its own volume.

## Example

```strudel
s("hh*16").gain("[.25 1]*4")
```

## Try this

Quieter:

```strudel
s("hh*16").gain("0.55")
```

A slider you can move with the mouse:

```strudel
s("bd sd, hh*8").gain(slider(0, 0, 1))
```
