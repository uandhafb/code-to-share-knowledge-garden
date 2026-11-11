---
title: note
tool: strudel
category: pitch
level: beginner
meetups: [2]
summary: "Plays pitches, written as numbers or letters."
related: [midi, add, instruments]
author: Uandha Fernandes Barbosa
---

## How it works

| How | What to write | Example |
|---|---|---|
| numbers | 60 is middle C, +1 is the next key on the piano, +12 is one octave up | `note("48 52 55 59")` |
| letters | `c d e f g a b` | `note("c e g b")` |
| black keys | add `#` (sharp, higher) or `b` (flat, lower) | `note("c# eb f# ab")` |
| octaves | add a number: `c4` is middle C, `c2` is low, `c6` is high | `note("c2 e3 g4 b5")` |

A letter with no number plays octave 3: `c` is `c3`, which is 48.

The mini-notation symbols work with notes too, so notes can be longer or take turns.

## Example

```strudel
note("c e g b").sound("piano")
```

## Try this

Octaves:

```strudel
note("c2 e3 g4 b5").sound("piano")
```

Black keys:

```strudel
note("db eb gb ab bb").sound("piano")
```

One note per cycle:

```strudel
note("<c a f e>").sound("piano")
```

`c` is three times longer than `eb`:

```strudel
note("c@3 eb").sound("piano")
```
