---
title: Harmony and chords
order: 4
summary: "Notes at the same time: chords, voicings, arpeggios, and bass lines."
notes: [chords, voicing, arpeggio, root-notes]
---

A **melody** is notes one after another; you can sing it. **Harmony** is notes at the same time; they sound together and color each other.

```text
melody:  c   e   g          harmony:  g
         ---------> time              e     <- all at once
                                      c
```

A **chord** is the building block of harmony. A list of chords played one after another is a **chord progression**, like C Am F G (used in many pop songs).

The same chords can be written in four ways:

| How | Example: C major, then A minor | You write… |
|---|---|---|
| letters | `note("<[c3,e3,g3] [a2,c3,e3]>")` | every note |
| numbers | `note("<[48,52,55] [45,48,52]>")` | every note |
| shape + root | `note("<[0,4,7] [0,3,7]>".add("<48 45>"))` | the shape, then the root |
| chord symbol | `chord("<C Am>").voicing()` | just the name |
