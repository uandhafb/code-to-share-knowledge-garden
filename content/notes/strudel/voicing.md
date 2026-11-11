---
title: voicing
tool: strudel
category: harmony
level: beginner
meetups: [2]
summary: Picks the notes of each chord so it moves smoothly to the next.
related: [chords, arpeggio, root-notes]
author: Uandha Fernandes Barbosa
---

## How it works

A **voicing** is the same chord with its notes in a different order or octave. `c e g`, `e g c`, and `g c e` are all C major: 12 keys up is the same letter, one octave higher.

`chord("...").voicing()` picks the notes for you and arranges them so each chord moves smoothly to the next one. That's **voice leading**: like singers in a choir, nobody jumps far.

## Example

```strudel
chord("<C Am F G>").voicing().sound("piano")
```

## Try this

Three voicings of C major, written by hand:

```strudel
note("<[c3,e3,g3] [e3,g3,c4] [g3,c4,e4]>").sound("piano")
```

*House of the Rising Sun*, sung by a choir:

```strudel
chord("<Am C D F>").voicing().sound("gm_voice_oohs")
```
