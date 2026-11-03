---
title: Functions
order: 3
summary: "Change the whole pattern, after the dot."
notes: [fast, slow, rev, jux, ply, degrade-by]
---

The mini-notation inside the quotes is the pattern. The functions after the dot change what we do with it. You can chain as many as you like, and a new line is fine, as long as it starts with a dot:

```strudel
s("crow [jazz:3 jazz:3] ~ <bd numbers:2>, hh*4")
  .fast(2).jux(rev).room(0.5).gain(slider(0.2, 0, 1))
```
