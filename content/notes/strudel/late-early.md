---
title: late / early
tool: strudel
category: functions
level: beginner
meetups: [1]
summary: Moves the pattern later or earlier in the cycle.
related: [stack, fast, layers]
author: Uandha Fernandes Barbosa
---

## How it works

`.late(0.125)` moves the pattern an eighth of a cycle later; `.early(0.125)` moves it earlier. You hear the shift against another pattern, so these examples use [[stack]].

## Example

```strudel
stack(
  s("bd*4"),
  s("cp*4").late(0.125)
)
```

## Try this

Early instead:

```strudel
stack(
  s("bd*4"),
  s("cp*4").early(0.125)
)
```
