---
title: bank
tool: strudel
category: sounds
level: beginner
meetups: [1]
summary: Plays the same drum names on a classic drum machine.
related: [sound, sample-numbers]
author: Uandha Fernandes Barbosa
---

## How it works

`.bank()` keeps the names (`bd`, `sd`, `hh`, `cp`…) and changes the drum machine they come from. Some banks don't have every sound; a missing one stays silent.

## Example

```strudel
s("bd sd hh cp").bank("RolandTR909")
```

## Try this

The Roland TR-808:

```strudel
s("bd sd hh cp").bank("RolandTR808")
```

The LinnDrum:

```strudel
s("bd sd hh cp").bank("LinnDrum")
```
