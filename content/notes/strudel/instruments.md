---
title: instruments
tool: strudel
category: pitch
level: beginner
meetups: [2]
summary: "Plays your notes on a piano, a synth wave, a bass, or a choir."
related: [note, sound, lpf]
author: Uandha Fernandes Barbosa
---

## How it works

`.sound()` works with notes too:

| Sound | What it is |
|---|---|
| `piano` | a piano |
| `sawtooth`, `square`, `triangle`, `sine` | synthesizer waves (`sawtooth` is bright, `sine` is soft) |
| `gm_acoustic_bass` | a double bass |
| `gm_voice_oohs` | a choir |

## Example

```strudel
note("c e g b").sound("sawtooth")
```

## Try this

A double bass:

```strudel
note("c2 g2 c2 g2").sound("gm_acoustic_bass")
```

A new sound every cycle:

```strudel
note("c e g b").sound("<piano sawtooth gm_voice_oohs>")
```
