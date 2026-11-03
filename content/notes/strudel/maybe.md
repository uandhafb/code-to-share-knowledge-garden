---
title: "maybe ?"
tool: strudel
category: mini-notation
level: beginner
meetups: [1]
summary: Gives each sound a chance to be skipped.
related: [random-pick, degrade-by, rest]
author: Uandha Fernandes Barbosa
---

## How it works

The number after `?` is the chance to **skip** each sound:

- `?` alone: 50% skipped, 50% played.
- `?0.2`: 20% skipped, 80% played.
- `?0.8`: 80% skipped, 20% played.

## Example

```strudel
s("hh*8?")
```

## Try this

Most of the hi-hats play:

```strudel
s("hh*8?0.2")
```

Only a few play:

```strudel
s("hh*8?0.8")
```
