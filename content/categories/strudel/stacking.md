---
title: More than one pattern
order: 5
summary: "Play several patterns at once with `$:` or `stack()`."
notes: [dollar, stack]
---

| | `$:` (one per line) | `stack()` (one pattern) |
|---|---|---|
| How | Each line is an independent pattern. | The layers are tied together; functions after `stack()` change every layer. |
| Mute | `_$:` mutes just that line. | Comment out a layer with `//`. |

Share what you made in the [shared Flok room](https://flok.plasm.studio/s/laco-your-code).
