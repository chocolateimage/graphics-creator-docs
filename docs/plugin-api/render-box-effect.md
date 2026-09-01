# Effect Render Box

A render box is where and how large the element will be displayed on the scene (before any grouping transformation happens).

An element defines the initial render box, and effects can change the render box if they need to.

Use cases for changing the render box are motion effects (where the box will move), or effects like blur (where the box will grow).

The render box that will be used for rendering will be stored in `renderContext->renderBox` (only valid in the render function).

## API

To add a custom render box function (function where the render box will be changed) to an effect, use the `intf->functions->setEffectGetRenderBoxFunc` function:

| Parameter  | Type                                                                                                                 | Description                                  |
| ---------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `effect`   | `Effect *`                                                                                                           | An effect definition                         |
| `function` | `void getRenderBox(PluginInterface *pluginInterface, PluginEffectRenderContext *renderContext, const Rect &lastBox)` | Pointer to the render box modifying function |

The render context for the render box function is the same as for rendering (except `->renderBox` is undefined), so you can access properties the same way.

The `lastBox` argument that gets passed is the render box from the last effect/element.

## Example

```cpp
void getRenderBox(PluginInterface *intf,
                  PluginEffectRenderContext *renderContext,
                  const Rect &lastBox) {
    int offsetX = intf->functions->getPropertyInt(intf->functions->getEffectProperty(renderContext, "offsetX"));
    int offsetY = intf->functions->getPropertyInt(intf->functions->getEffectProperty(renderContext, "offsetY"));

    // moving the box with the offset.
    renderContext->renderBox = {lastBox.x + offsetX, lastBox.y + offsetY, lastBox.w, lastBox.h};
}

int gcPluginInit(...) {
    // ...
    intf->functions->setEffectGetRenderBoxFunc(effect, getRenderBox);
    // ...
}
```
