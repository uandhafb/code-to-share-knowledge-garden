---
title: slow
tool: strudel
category: functions
level: beginner
meetups: [1]
summary: Plays the pattern slower.
related: [fast, fast-and-slow, setcps]
author: Uandha Fernandes Barbosa
---

## How it works

`.slow(2)` stretches the whole pattern over two cycles.

## Example

```strudel
s("bd sd [~ bd] sd").slow(2)
```

## Try this

`slow(0.5)` is the same as `fast(2)`:

```strudel
s("bd sd [~ bd] sd").slow(0.5)
```
