---
hidden: true # next week, Meetup #2
title: brightness
tool: hydra
category: color
level: beginner
meetups: [2]
summary: Adds light to the whole image.
related: [contrast, color, saturate]
author: Uandha Fernandes Barbosa
---

## Signature & defaults

`brightness(amount)` · default: `brightness(0.4)`

Careful: `brightness()` with nothing makes the image **brighter**, because the default is 0.4, not 0.

## Parameters

- **amount**: how much light to add (0 = normal).

## Negative values

- **amount**: the image gets darker.

## Sketch

```hydra
osc(20, 0, 2).brightness(-0.3).out()
```

## Try this

Brightness that rises and falls (see [[arrow-functions]]):

```hydra
osc(20, 0, 2).brightness(() => Math.sin(time)).out()
```
