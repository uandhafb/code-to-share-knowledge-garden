---
title: setcps
tool: strudel
category: sounds
level: beginner
meetups: [1]
summary: "Sets the tempo in cycles, not beats."
related: [sequence, fast, slow]
author: Uandha Fernandes Barbosa
---

## How it works

Scores and DAWs count beats: **BPM** (beats per minute). Strudel counts **cycles**: **CPS** (cycles per second) with `setcps`, or **CPM** (cycles per minute) with `setcpm`. Without either, the tempo is `setcps(0.5)`: one cycle every two seconds.

| Code | What it means |
|---|---|
| `setcps(0.5)` | The default: one cycle every two seconds. |
| `setcps(1)` | One cycle every second. |
| `setcpm(30)` | 30 cycles per minute, the same as `setcps(0.5)`. |
| `setcpm(1)` | One cycle every 60 seconds. |
| `setcps(120/60/4)` | 120 BPM with four beats per cycle: the same as `setcps(0.5)` and `setcpm(30)`. |

To convert, divide the BPM by the number of beats per cycle: CPM = BPM ÷ beats per cycle.

## Example

```strudel
setcps(0.7)
s("bd sd hh cp")
```

## Try this

120 BPM, with four beats in each cycle:

```strudel
setcpm(120/4)
s("bd sd bd sd")
```

One cycle every second:

```strudel
setcps(1)
s("bd sd [~ bd] sd")
```
