---
title: "replicate !"
tool: strudel
category: mini-notation
level: beginner
meetups: [1]
summary: Repeats an event as separate steps.
related: [fast-and-slow, elongate, sequence]
author: Uandha Fernandes Barbosa
---

## How it works

`bd!3` is three separate `bd` steps, so `"bd!3 sd"` has four steps. Compare with `*`, which squeezes the copies into one step.

## Example

```strudel
s("bd!3 sd")
```

## Try this

The same thing, written out:

```strudel
s("bd bd bd sd")
```

Compare: two steps, with three kicks squeezed into the first:

```strudel
s("bd*3 sd")
```
