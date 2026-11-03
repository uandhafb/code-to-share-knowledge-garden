---
title: Effects
order: 4
summary: "Change how each sound sounds: volume, space, echo, pitch, and position."
notes: [gain, room, delay, speed, pan]
---

| Effect | What it does | Values |
|---|---|---|
| `.gain()` | volume | 0 is silent, 0.8 is the default, 1 is louder |
| `.room()` | reverb, like a big room | 0 to 1 |
| `.delay()` | echo | 0 to 1 |
| `.speed()` | playback speed (and pitch) | 2 is higher, −1 is backwards |
| `.pan()` | left / right position | 0 is left, 0.5 is the middle, 1 is right |

All together:

```strudel
s("bd sd [~ bd] <sd cp>, hh*8?").bank("RolandTR909").room(0.2).jux(rev)
```
