---
title: "chords [ , ]"
tool: strudel
category: harmony
level: beginner
meetups: [2]
summary: "Several notes at the same time: a comma inside brackets."
related: [voicing, add, layers]
author: Uandha Fernandes Barbosa
---

## How it works

A comma inside `[ ]` plays notes together. The **root** is the note that gives the chord its name (C in C major). Count the piano keys (semitones) up from the root to get the chord's **shape**:

```text
step:          0   1   2   3   4   5   6   7   8
key (root C):  c   c#  d   eb  e   f   f#  g   ab
major   C      X               X           X        0,4,7   bright
minor   Cm     X           X               X        0,3,7   darker
dim     Co     X           X           X            0,3,6   tense
aug     Caug   X               X               X    0,4,8   floating
```

The feelings are common, not rules.

| Chord | Shape | Symbol |
|---|---|---|
| major | 0,4,7 | `C` (also `CM`, `C^`) |
| minor | 0,3,7 | `Cm` (also `C-`) |
| diminished | 0,3,6 | `Co` |
| augmented | 0,4,8 | `Caug` |
| seventh | 0,4,7,10 | `C7` |
| minor seventh | 0,3,7,10 | `Cm7` (also `C-7`) |
| major seventh | 0,4,7,11 | `C^7` |

Any root works: `Am`, `F#m`, `Bb7`, `Eo`… Careful: `Cdim` and `C+` give an error; use `Co` and `Caug`.

## Example

```strudel
note("[c3,e3,g3]").sound("piano")
```

## Try this

The same chord with numbers:

```strudel
note("[48,52,55]").sound("piano")
```

The same chord as a shape, moved up to C3 (48):

```strudel
note("[0,4,7]".add(48)).sound("piano")
```

One shape, many chords: C, F, G, C:

```strudel
note("[0,4,7]".add("<48 53 55 48>")).sound("piano")
```
