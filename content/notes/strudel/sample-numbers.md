---
title: sample numbers
tool: strudel
category: sounds
level: beginner
meetups: [1]
summary: Picks a different recording of the same sound.
related: [sound, bank]
author: Uandha Fernandes Barbosa
---

## How it works

Most sounds have several recordings. A colon and a number pick one: `jazz:3` is sample 3 of `jazz`. Counting starts at 0, not 1.

Watch the spaces: `jazz:3` is one step, but `jazz 3` is **two** steps: `jazz`, then a sound called `3`, which doesn't exist.

## Example

```strudel
s("jazz:0 jazz:1 jazz:2 jazz:3")
```

## Try this

The same thing, written with `n`:

```strudel
n("0 1 2 3").s("jazz")
```

A voice counting:

```strudel
s("numbers:1 numbers:2 numbers:3")
```
