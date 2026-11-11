---
title: pan
tool: strudel
category: effects
level: beginner
meetups: [1, 2]
summary: Moves each sound between the left and right speakers.
related: [jux, gain, stack]
author: Uandha Fernandes Barbosa
---

## How it works

0 is left, 0.5 is the middle, and 1 is right. Use headphones or two speakers.

## Example

```strudel
s("bd rim bd cp").pan("0 1")
```

## Try this

Swinging left and right:

```strudel
s("hh*16").pan(sine)
```

Every sound lands in a random place:

```strudel
s("hh*16").pan(rand)
```
