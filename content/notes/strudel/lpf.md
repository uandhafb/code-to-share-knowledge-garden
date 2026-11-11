---
title: lpf
tool: strudel
category: effects
level: beginner
meetups: [2]
summary: "A low-pass filter: lets the low part through and cuts the bright part."
related: [vowel, adsr, instruments]
author: Uandha Fernandes Barbosa
---

## How it works

A low number sounds muffled, like music through a wall; a high number sounds bright. 200 is muffled and 5000 is bright.

The value can change over time: `sine.range(200, 2000).slow(4)` swings between 200 and 2000, like a wave, over four cycles.

## Example

```strudel
note("c2 c2 c3 c2").sound("sawtooth").lpf(300)
```

## Try this

Bright:

```strudel
note("c2 c2 c3 c2").sound("sawtooth").lpf(3000)
```

A new value every cycle:

```strudel
note("c2 c2 c3 c2").sound("sawtooth").lpf("<300 800 2000>")
```

Opens and closes like a wave:

```strudel
note("c2 c2 c3 c2").sound("sawtooth").lpf(sine.range(200, 2000).slow(4))
```
