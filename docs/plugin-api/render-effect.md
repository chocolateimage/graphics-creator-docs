# Effect Rendering

This is where the most stuff usually happens in an effect.

## API

To add your render function to an effect, use the `intf->functions->setEffectRenderFunc` function:

| Parameter  | Type                                                                                                                                                              | Description                                                                                                            |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `effect`   | `Effect *`                                                                                                                                                        | An effect definition                                                                                                   |
| `function` | `bool getRenderBox(PluginInterface *pluginInterface, PluginEffectRenderContext *renderContext, const uint32_t *source, const Rect &sourceRect, uint32_t *target)` | Pointer to the render function. The render function should return true when successful and false when it has an error. |

The argument `source` are the pixels stored before this effect runs. The rect for this (useful for size) is stored in `sourceRect`.

The argument `target` is where you will be writing the pixels. Memory for this is allocated already with the size from the [render box](render-box-effect.md). The render box for the target is stored in `renderContext->renderBox`.

## Pixel format

Each pixel is 32 bits, with 8 bits per color (stored as ARGB).

The pixels can be iterated with `pixelIndex(x, y, stride)`:

```cpp
for (int y = 0; y < h; y++) {
    for (int x = 0; x < w; x++) {
        int index = pixelIndex(x, y, w);
        // index used for extracing pixel values with extractRGBA or manual extracting
    }
}
```

The colors can be extracted with function `extractRGBA(uint32_t num)`:

```cpp
auto [r,g,b,a] = extractRGBA(pixel);
// r,g,b,a are uint8_t variables.
```

The channels can then be combined together to a uint32_t pixel with the `makePixel(uint8_t r, uint8_t g, uint8_t b, uint8_t a)` function:

```cpp
uint32_t pixel = makePixel(r,g,b,a);
// pixel is stored as ARGB.
```

## Example

```cpp
bool render(PluginInterface *intf, PluginEffectRenderContext *renderContext,
            const uint32_t *source, const Rect &sourceRect, uint32_t *target) {
    Rect rect = renderContext->renderBox;

    for (int y = 0; y < rect.h; y++) {
        for (int x = 0; x < rect.w; x++) {
            //                                                      ↓ here in pixelIndex "sourceRect" is used, because it's from the source
            auto [r, g, b, a] = extractRGBA(source[pixelIndex(x, y, sourceRect.w)]);

            // If you change the renderBox's size, then you may want to add checks to the above x and y for the source.

            // Do stuff with pixels

            //                      ↓ here in pixelIndex "rect" is used, because it gets set to the target
            target[pixelIndex(x, y, rect.w)] = makePixel(r, g, b, a);
        }
    }

    return true;
}

int gcPluginInit(...) {
    // ...
    intf->functions->setEffectRenderFunc(effect, render);
    // ...
}
```
