---
title: room
tool: strudel
category: effects
level: beginner
meetups: [1, 2]
summary: "Adds reverb, like a big room."
related: [delay, gain, pan]
author: Uandha Fernandes Barbosa
---

## How it works

`.room()` goes from 0 (dry, no reverb) to 1 (a very big room).

## Example

```strudel
s("bd rim? bd*4 cp?0.8").room(0.5)
```

## Try this

A huge, distant space:

```strudel
s("crow:0 ~ crow:2 ~").room(0.9)
```

A piano in a big hall:

```strudel
note("c e g b").sound("piano").room(1)
```
