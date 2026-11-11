---
title: arpeggio
tool: strudel
category: harmony
level: beginner
meetups: [2]
summary: The notes of a chord played one at a time.
related: [voicing, chords, scale]
author: Uandha Fernandes Barbosa
---

## How it works

An arpeggio plays the notes of a chord one at a time instead of together. The name comes from *arpa*, Italian for harp: like fingers running over the strings.

```text
chord:      [E3,C4,E4,G4]   all at once
arpeggio:    E3  C4  E4  G4  one after another
```

`.voicing()` builds the chord, and `n("...")` picks notes out of it by number: 0 is the **lowest** note of the voicing, 1 is the next one up, and so on. Numbers bigger than the chord keep going, one octave higher.

- C → E3 C4 E4 G4
- Am → A3 C4 E4 A4
- F → F3 C4 F4 A4
- G → G3 D4 G4 B4

Careful: 0 is the lowest note, not always the root. For C, the lowest note is E3.

## Example

```strudel
n("0 1 2 3").chord("<C Am F G>").voicing().sound("piano")
```

## Try this

Up and down:

```strudel
n("0 1 2 3 4 3 2 1").chord("<C Am F G>").voicing().sound("piano")
```
