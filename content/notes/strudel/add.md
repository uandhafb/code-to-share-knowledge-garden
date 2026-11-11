---
title: add
tool: strudel
category: pitch
level: beginner
meetups: [2]
summary: Counts piano keys up from a starting note.
related: [note, midi, chords]
author: Uandha Fernandes Barbosa
---

## How it works

`.add(48)` adds 48 to every number, so you can think in "how many piano keys up from my starting note":

- 0 + 48 = 48 = c3
- 4 + 48 = 52 = e3
- 7 + 48 = 55 = g3
- 11 + 48 = 59 = b3

Negative numbers go **down** from the starting note.

**What is 0?** On its own, `note("0")` is MIDI note 0: a C so low (about 8 Hz) that you can't hear it. That's why we add a starting note: then 0 is the starting note itself.

## Example

```strudel
note("0 4 7 11".add(48)).sound("piano")
```

## Try this

59 60 61 62: one key below middle C, middle C, then one and two keys above:

```strudel
note("-1 0 1 2".add(60)).sound("piano")
```
