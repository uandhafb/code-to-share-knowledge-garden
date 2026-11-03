---
title: degradeBy
tool: strudel
category: functions
level: beginner
meetups: [1]
summary: Removes some of the sounds at random.
related: [maybe, random-pick, ply]
author: Uandha Fernandes Barbosa
---

## How it works

`.degradeBy(0.5)` removes 50% of the sounds at random. It works like [[maybe]] (`?`), but on the whole pattern.

## Example

```strudel
s("hh*8").degradeBy(0.5)
```

## Try this

Remove only a few:

```strudel
s("hh*16").degradeBy(0.2)
```
