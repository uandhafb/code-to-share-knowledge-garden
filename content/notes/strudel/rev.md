---
title: rev
tool: strudel
category: functions
level: beginner
meetups: [1]
summary: Plays the pattern backwards.
related: [jux, speed, fast]
author: Uandha Fernandes Barbosa
---

## How it works

`.rev()` reverses the order of the events in each cycle. The sounds themselves still play forwards (for that, see [[speed]]).

## Example

```strudel
s("bd sd cp hh").rev()
```

## Try this

Counting backwards:

```strudel
s("numbers:1 numbers:2 numbers:3 numbers:4").rev()
```
