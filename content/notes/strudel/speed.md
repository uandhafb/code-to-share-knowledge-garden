---
title: speed
tool: strudel
category: effects
level: beginner
meetups: [1, 2]
summary: Changes the playback speed and pitch.
related: [rev, delay, sample-numbers]
author: Uandha Fernandes Barbosa
---

## How it works

1 is normal, 2 is twice as fast and higher, 0.5 is slower and lower, and a negative speed plays the sound backwards.

## Example

```strudel
s("bd rim bd cp").speed("<1 2 -1 -2>")
```

## Try this

A voice, backwards:

```strudel
s("numbers:1 numbers:2").speed(-1)
```

Slower and lower:

```strudel
s("numbers:1 numbers:2").speed(0.5)
```
