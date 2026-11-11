---
title: Modulate
order: 5
summary: A second image decides how much each pixel is transformed.
notes: [modulate, modulate-rotate, modulate-scale, modulate-scroll, modulate-repeat, modulate-kaleid, modulate-pixelate, modulate-hue]
---

Normal geometry does the same thing to every pixel. Modulate functions let a **second image** decide how much each pixel is transformed: bright parts change a lot, dark parts a little.

The word after `modulate` names the transformation being controlled: `rotate` becomes `modulateRotate`, `scale` becomes `modulateScale`, and so on. Plain `modulate` works like a scroll. It's like FM in a synth, but for images: the result is liquid, organic, glitchy distortion.

`imageA.modulate(imageB, amount).out()`

| Function (defaults) | It's like… | What you see |
|---|---|---|
| `modulate(B, 0.1)` | `scroll` | wavy glass, liquid |
| `modulateRotate(B, 1, 0)` | `rotate` | each part turns differently |
| `modulateScale(B, 1, 1)` | `scale` | each part zooms differently |
| `modulateScrollX(B, 0.5, 0)` | `scrollX` | pushed sideways by B |
| `modulateScrollY(B, 0.5, 0)` | `scrollY` | pushed up and down by B |
| `modulateRepeat(B, 3, 3, 0.5, 0.5)` | `repeat` | a grid scattered by B |
| `modulateRepeatX(B, 3, 0.5)` / `modulateRepeatY(B, 3, 0.5)` | `repeatX` / `repeatY` | columns or rows pushed by B |
| `modulateKaleid(B, 4)` | `kaleid` | a kaleidoscope that melts |
| `modulatePixelate(B, 10, 3)` | `pixelate` | B decides the pixel size |
| `modulateHue(B, 1)` | (no twin) | pushed by B's colors |

## Rotate vs modulateRotate

With `rotate`, the whole image turns by the same amount:

```hydra
shape(4, 0.4).rotate(1).out()
```

With `modulateRotate`, the noise decides how much each pixel turns:

```hydra
shape(4, 0.4).modulateRotate(noise(3), 1).out()
```
