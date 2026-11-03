---
hidden: true # next week, Meetup #2
title: Modulate
order: 5
summary: A second image decides how much each pixel is transformed.
notes: [modulate, modulate-rotate, modulate-scale, modulate-pixelate, modulate-repeat, modulate-kaleid]
---

Normal geometry does the same thing to every pixel. Modulate functions let a **second image** decide how much each pixel is transformed: bright parts change a lot, dark parts a little.

The word after `modulate` names the transformation being controlled: `rotate` becomes `modulateRotate`, `scale` becomes `modulateScale`, and so on. Plain `modulate` works like a scroll.

## Rotate vs modulateRotate

With `rotate`, the whole image turns by the same amount:

```hydra
shape(4, 0.4).rotate(1).out()
```

With `modulateRotate`, the noise decides how much each pixel turns:

```hydra
shape(4, 0.4).modulateRotate(noise(3), 1).out()
```
