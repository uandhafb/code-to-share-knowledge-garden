---
title: sound
tool: strudel
category: sounds
level: beginner
meetups: [1]
summary: Plays sounds by name.
related: [sample-numbers, bank, sequence]
author: Uandha Fernandes Barbosa
---

## How it works

`sound("bd sd")` plays a bass drum, then a snare drum. `s("bd sd")` is the same thing, only shorter.

| Name | Sound | How many |
|---|---|---|
| `bd` | bass drum (kick) | depends on the bank |
| `sd` | snare drum | depends on the bank |
| `hh` / `oh` | closed / open hi-hat | depends on the bank |
| `cp` | clap | depends on the bank |
| `rim` | rimshot | depends on the bank |
| `lt` / `mt` | low / mid tom | depends on the bank |
| `insect` | insects | 3 |
| `wind` | wind | 10 |
| `jazz` | jazz drum hits | 8 |
| `metal` | metal hits | 10 |
| `east` | percussion | 9 |
| `crow` | crows | 4 |
| `casio` | a small Casio keyboard | 3 |
| `space` | space sounds | 18 |
| `numbers` | a voice saying numbers | 9 |

## Example

```strudel
s("bd sd hh cp")
```

## Try this

Sounds that aren't drums:

```strudel
s("insect wind crow space")
```

The long name does the same thing:

```strudel
sound("jazz metal east casio")
```
