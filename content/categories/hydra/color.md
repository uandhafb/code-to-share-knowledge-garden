---
title: Color
order: 3
summary: Transformations that change the colors of the image.
notes: [posterize, shift, invert, contrast, brightness, luma, thresh, color, saturate, hue, colorama, r-g-b]
---

Color functions keep every pixel where it is and change its value: how bright, how colorful, and which color. Like every transformation, they go between the source and `.out()`.

## Chain them

The order matters here too. In the Hydra editor, put the cursor inside the block and press **Alt + Enter** (**Option + Enter** on a Mac):

```hydra
osc(10, 0.1, 1)
  .rotate(() => Math.sin(time * 0.2))
  .brightness(-0.2)
  .contrast(2)
  .hue(() => time * 0.05)
  .out()
```
