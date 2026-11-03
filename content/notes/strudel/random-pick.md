---
title: "random pick |"
tool: strudel
category: mini-notation
level: beginner
meetups: [1]
summary: Picks one of the options at random every cycle.
related: [alternate, maybe, layers]
author: Uandha Fernandes Barbosa
---

## How it works

Every cycle, Strudel picks one of the options separated by `|`. Every option has the same chance: 50% each for two options, about 33% each for three, and 25% each for four.

## Example

```strudel
s("bd [sd|cp|rim]")
```

## Try this

The whole cycle: `bd sd` or `cp ~ cp?`, 50% each:

```strudel
s("bd sd | cp ~ cp?")
```
