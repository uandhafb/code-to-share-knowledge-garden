---
title: "layers ,"
tool: strudel
category: mini-notation
level: beginner
meetups: [1]
summary: Plays several patterns at the same time.
related: [polymeter, stack, sequence]
author: Uandha Fernandes Barbosa
---

## How it works

A comma starts a new layer. Each layer fills the same cycle and plays at the same time as the others.

## Example

```strudel
s("bd sd, hh*4")
```

## Try this

Three layers:

```strudel
s("bd sd, hh*4, ~ cp")
```

One sound per layer:

```strudel
s("bd, sd, hh*4")
```
