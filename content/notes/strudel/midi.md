---
title: MIDI numbers
tool: strudel
category: pitch
level: beginner
meetups: [2]
summary: "Every note is a number from 0 to 127, one per piano key."
related: [note, add, instruments]
author: Uandha Fernandes Barbosa
---

## How it works

MIDI (Musical Instrument Digital Interface, 1983) is the language that keyboards, synths, and computers use to talk to each other. In MIDI, every note is a number from 0 to 127, one number per piano key. In Strudel, `note("60")` is MIDI note 60: middle C.

| MIDI number | Note | Where |
|---|---|---|
| 0 | C-1 | about 8 Hz, too low to hear |
| 21 | A0 | the lowest key on a real piano |
| 48 | C3 | a letter with no number: `c` is `c3` |
| 60 | C4 | middle C |
| 72 | C5 | one octave above middle C |
| 108 | C8 | the highest key on a real piano |
| 127 | G9 | the highest MIDI number |

+1 is the next key, +12 is one octave up, and −12 is one octave down.

## Example

```strudel
note("48 52 55 59").sound("piano")
```

## Try this

The same melody with letters and octaves:

```strudel
note("c3 e3 g3 b3").sound("piano")
```
