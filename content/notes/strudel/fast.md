---
title: fast
tool: strudel
category: functions
level: beginner
meetups: [1]
summary: Plays the pattern faster.
related: [slow, fast-and-slow, setcps]
author: Uandha Fernandes Barbosa
---

## How it works

`.fast(2)` plays the whole pattern twice per cycle.

## Example

```strudel
s("bd sd [~ bd] sd").fast(2)
```

## Try this

A different speed every cycle:

```strudel
s("bd sd [~ bd] sd").fast("<1 2 4>")
```
