---
title: "faster * and slower /"
tool: strudel
category: mini-notation
level: beginner
meetups: [1]
summary: "Repeats an event inside its step, or stretches it over several cycles."
related: [replicate, fast, slow]
author: Uandha Fernandes Barbosa
---

## How it works

- `*` repeats an event *n* times inside its step: `hh*4` is four hi-hats in the time of one.
- `/` slows an event down: `sd/4` plays only once every four cycles.

## Example

```strudel
s("bd hh*4")
```

## Try this

The same thing, written out:

```strudel
s("bd [hh hh hh hh]")
```

The snare plays only once every four cycles:

```strudel
s("lt sd/4")
```

The whole pattern four times per cycle, so the snare plays once per cycle:

```strudel
s("[lt sd/4]*4")
```
