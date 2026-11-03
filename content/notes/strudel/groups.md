---
title: groups .
tool: strudel
category: mini-notation
level: beginner
meetups: [1]
summary: Groups steps without typing brackets.
related: [nest, sequence, layers]
author: Uandha Fernandes Barbosa
---

## How it works

A dot splits the pattern into groups, and each group becomes one step: `"bd sd . hh hh hh"` is the same as `"[bd sd] [hh hh hh]"`.

## Example

```strudel
s("bd sd . hh hh hh")
```

## Try this

Two groups:

```strudel
s("bd sd . ~ cp?0.8 lt*2")
```

The same thing, with brackets:

```strudel
s("[bd sd] [~ cp?0.8 lt*2]")
```
