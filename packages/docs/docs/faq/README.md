# FAQ

## Why can't `palette.styl` and `style.styl` merge into one API?

The `palette.styl` is responsible for global color settings. During compilation, theme color constants should be resolved by the preprocessor first and then applied to the global. But for `style.styl`. its job is to override the $default style. According to the priority principle of css, the later style has a higher priority, so it should be generated at the end of the CSS file. A simple diagram is used to describe the compiler's compilation order as follows:

```
  $palette.styl

     ↓ ↓ ↓

 $default styles

     ↓ ↓ ↓

   $style.styl
```

