---
title: jux
tool: strudel
category: functions
level: beginner
meetups: [1]
summary: "Left ear normal, right ear transformed."
related: [rev, pan, stack]
author: Uandha Fernandes Barbosa
---

## How it works

`.jux(rev)` plays the pattern as it is in the left ear and backwards in the right. Use headphones or two speakers.

## Example

```strudel
s("bd sd cp hh").jux(rev)
```

## Try this

Any transformation works, here twice as fast on the right:

```strudel
s("bd sd [~ bd] sd, hh*4").jux(x => x.fast(2))
```
