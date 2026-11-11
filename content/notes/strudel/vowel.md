---
title: vowel
tool: strudel
category: effects
level: beginner
meetups: [2]
summary: Shapes the sound like a mouth singing a vowel.
related: [lpf, instruments, adsr]
author: Uandha Fernandes Barbosa
---

## How it works

`.vowel()` takes `"a"`, `"e"`, `"i"`, `"o"`, or `"u"`.

## Example

```strudel
note("c3 eb3 g3 bb3").sound("sawtooth").vowel("<a e i o>")
```

## Try this

One vowel per note:

```strudel
note("c3 eb3 g3 bb3").sound("sawtooth").vowel("a e i o")
```
