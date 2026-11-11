---
title: adsr
tool: strudel
category: effects
level: beginner
meetups: [2]
summary: "The shape of every note: attack, decay, sustain, and release."
related: [lpf, instruments, gain]
author: Uandha Fernandes Barbosa
---

## How it works

```text
volume
  |    /\
  |   /  \________
  |  /            \
  | /              \
  +-------------------------> time
    A   D    S      R
```

- **A, attack:** how long it takes to reach full volume (0 is a hit, 1 is a slow fade in).
- **D, decay:** how long it takes to fall to the sustain level.
- **S, sustain:** the volume it keeps while the note lasts (0 to 1).
- **R, release:** how long it takes to fade out at the end.

Write the four values separated by colons: `.adsr(".1:.1:.5:.2")`.

## Example

```strudel
note("c3 e3 g3 b3").sound("sawtooth").adsr(".1:.1:.5:.2")
```

## Try this

Short plucks:

```strudel
note("c3 e3 g3 b3").sound("sawtooth").adsr("0:.1:0:0")
```

Slow pads:

```strudel
note("c3 e3 g3 b3").sound("sawtooth").adsr("1:0:1:1")
```

All the effects together:

```strudel
n("0 [2 4] <6 7> ~").scale("D:dorian").sound("sawtooth")
  .lpf(800).room(0.5).adsr(".05:.1:.5:.3")
```
