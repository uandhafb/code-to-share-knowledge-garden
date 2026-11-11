---
title: delay
tool: strudel
category: effects
level: beginner
meetups: [1, 2]
summary: Adds an echo.
related: [room, gain, speed]
author: Uandha Fernandes Barbosa
---

## How it works

`.delay()` goes from 0 (no echo) to 1 (a loud echo). Three values separated by colons set the amount, the time between echoes, and how many come back (the feedback): `.delay(".65:.25:.9")`.

## Example

```strudel
s("bd rim bd cp").delay("0.5")
```

## Try this

A single clap with a long echo:

```strudel
s("~ cp").delay(0.8)
```

Amount, time between echoes, and feedback:

```strudel
s("bd rim").delay(".65:.25:.9")
```
