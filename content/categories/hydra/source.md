---
title: Source
order: 1
summary: Generates the signal. Every chain starts with a source.
notes: [osc, noise, voronoi, shape, gradient, solid, src]
---

## Rules for every function

- If you leave parameters out, Hydra uses defaults: `osc()` is `osc(60, 0.1, 0)`, `noise()` is `noise(10, 0.1)`, `voronoi()` is `voronoi(5, 0.3, 0.3)`, `shape()` is `shape(3, 0.3, 0.01)`, `gradient()` is `gradient(0)` and `solid()` is `solid(0, 0, 0, 1)`, a black screen.
- Parameters are read from left to right, so you can only leave values out **from the end**. `osc(30, , 1)` is an error.
- **Careful with empty spaces:** an empty space between two commas is not a default; it breaks the code. `osc(-10, , 0)` is an error. Type the value, even when it's the default: `osc(-10, 0, 0)`.
- Negative numbers often flip, mirror, or reverse something. Each note shows what they do.
- Functions that **combine two images** (`add`, `sub`, `mult`, `diff`, `blend`, `layer`, and all the `modulate…` functions) take the second image first: a source, a chain, or an output like `o1`. A number alone is not an image.
- In the [Hydra editor](https://hydra.ojack.xyz), **Ctrl+Enter** runs the current line, **Alt+Enter** (**Option+Enter** on a Mac) runs a block, **Ctrl+Shift+Enter** runs everything and `hush()` clears the screen. In this garden, **Ctrl/⌘ + Enter** runs the code box you're typing in.

## Try the defaults

Each source with no parameters at all:

```hydra
osc().out()
```

```hydra
noise().out()
```

```hydra
voronoi().out()
```

```hydra
shape().out()
```

```hydra
gradient().out()
```

```hydra
solid().out()
```
