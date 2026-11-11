---
title: stack
tool: strudel
category: stacking
level: beginner
meetups: [1, 2]
summary: Ties several patterns together into one.
related: [dollar, layers, pan]
author: Uandha Fernandes Barbosa
---

## How it works

`stack()` holds several patterns, separated by commas. They play together as one pattern, so a function after `stack()` changes every layer. Comment out a layer with `//` to mute it.

## Example

```strudel
stack(
  s("bd sd [~ bd] sd"),
  // s("lt*8")
).pan("<0 0 1 0>").gain(0.5)
```

## Try this

Two layers, one effect for both:

```strudel
stack(
  s("bd sd [~ bd] sd"),
  s("hh*8")
).room(0.4)
```
