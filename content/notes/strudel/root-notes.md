---
title: rootNotes
tool: strudel
category: harmony
level: beginner
meetups: [2]
summary: "Plays the root of each chord, low, for a bass line."
related: [voicing, chords, instruments]
author: Uandha Fernandes Barbosa
---

## How it works

The root is the note in the chord's name: C → c, Am → a, F → f, G → g. `.rootNotes(2)` plays only that note, in octave 2, which is low, where the bass lives.

`.struct("x ~ x x")` gives it a rhythm: `x` plays and `~` rests.

## Example

```strudel
chord("<C Am F G>").rootNotes(2).sound("gm_acoustic_bass")
```

## Try this

With a rhythm:

```strudel
chord("<C Am F G>").rootNotes(2).struct("x ~ x x").sound("gm_acoustic_bass")
```

Chords, arpeggio, and bass together:

```strudel
$: chord("<C Am F G>").voicing().sound("piano").gain(0.5)
$: n("0 1 2 3 4 3 2 1").chord("<C Am F G>").voicing().sound("sawtooth").lpf(1200).gain(0.4)
$: chord("<C Am F G>").rootNotes(2).struct("x ~ x x").sound("gm_acoustic_bass")
```
