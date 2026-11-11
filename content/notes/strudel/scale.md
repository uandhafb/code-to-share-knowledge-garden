---
title: scale
tool: strudel
category: scales
level: beginner
meetups: [2]
summary: The numbers become steps of a scale.
related: [arpeggio, note, chords]
author: Uandha Fernandes Barbosa
---

## How it works

With `n("...")` and `.scale("...")`, the numbers become **steps** of the scale: 0 is the tonic, 1 is the next note of the scale, and 7 is the tonic one octave up. Negative numbers go below the tonic.

- `note` is an exact pitch, like a piano key: `note("c e g")`.
- `n` is a step inside a scale: `n("0 2 4").scale("C:major")`.

`"C:minor"` is the tonic, a colon, then the scale name. Add an octave to the tonic to play lower or higher: `"A2:minor:pentatonic"`. In mini-notation, `..` fills in all the numbers in between: `"0 .. 7"`.

| Scale | Notes from 0 to 7 |
|---|---|
| `C:major` | C D E F G A B C |
| `C:minor` | C D Eb F G Ab Bb C |
| `D:dorian` | D E F G A B C D |
| `G:mixolydian` | G A B C D E F G |
| `A2:minor:pentatonic` | A C D E G A C D (5 notes, then it repeats) |
| `C:major:blues` | C D Eb E G A C D |
| `C:minor:blues` | C Eb F Gb G Bb C Eb |
| `C:iwato` | C Db F Gb Bb C Db F (a Japanese scale) |

## Example

```strudel
n("0 1 2 3 4 5 6 7").scale("C:major").sound("piano")
```

## Try this

The same scale, with `..`:

```strudel
n("0 .. 7").scale("C:major").sound("piano")
```

Down a minor scale:

```strudel
n("7 .. 0").scale("C:minor").sound("piano")
```

The same numbers in a different scale: listen to the mood change (try `C:major` and `C:minor` too):

```strudel
n("0 2 4 <6 7>").scale("C:iwato").sound("piano")
```

A new scale every four cycles:

```strudel
n("0 2 4 6").scale("<C:major D:mixolydian>/4").sound("piano")
```

Chords in a scale: `[0,2,4]` is the tonic chord:

```strudel
n("<[0,2,4] [-2,0,2] [-1,1,3] [-3,-1,1]>").scale("C4:minor").sound("piano")
```
