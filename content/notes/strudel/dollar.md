---
title: "$:"
tool: strudel
category: stacking
level: beginner
meetups: [1, 2]
summary: "Each line is its own pattern; `_$:` mutes one."
related: [stack, layers, gain]
author: Uandha Fernandes Barbosa
---

## How it works

Start each line with `$:` to play several independent patterns at once. Add an underscore, `_$:`, to mute a line without deleting it.

## Example

```strudel
$: s("bd sd [~ bd] sd")
_$: s("hh*8").gain(0.5)
$: s("~ cp")
```

## Try this

Two lines with their own effects:

```strudel
$: s("lt sd? [~ bd] <sd cp>, hh*8?").bank("RolandTR909").room(0.2).jux(rev)
$: s("~ ~ ~ [insect insect:2]").slow(2).room(0.8).pan(sine).gain(0.7)
```
