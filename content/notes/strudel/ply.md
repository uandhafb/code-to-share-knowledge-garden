---
title: ply
tool: strudel
category: functions
level: beginner
meetups: [1]
summary: Repeats every sound n times.
related: [fast, replicate, fast-and-slow]
author: Uandha Fernandes Barbosa
---

## How it works

`.ply(2)` plays each event twice in its own step, so the pattern keeps its shape but gets busier.

## Example

```strudel
s("bd sd").ply(2)
```

## Try this

One, then two, then three of each:

```strudel
s("bd sd").ply("<1 2 3>")
```
