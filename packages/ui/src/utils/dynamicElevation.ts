import type { ColorLike } from "@ui-types";
import { formatHex8, oklch, parse } from "culori";

export const dynamicElevation = (color: ColorLike, elevation: number) => {
    const parsedColor = parse(color);
    if (!parsedColor) return color;

    const oklchColor = oklch(parsedColor);

    const increment = 0.02;

    const newLightness = Math.min(oklchColor.l + elevation * increment, 1);

    const adjustedColor = {
        ...oklchColor,
        l: newLightness,
        alpha: oklchColor.alpha ?? 1,
    };

    return formatHex8(adjustedColor);
};
