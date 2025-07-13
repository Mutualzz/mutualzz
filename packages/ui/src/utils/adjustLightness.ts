import { type Color, oklch, rgb } from "culori";

export const adjustLightness = (color: Color, amount: number) => {
    const oklchColor = oklch(color);

    const newLightness = Math.min(Math.max(oklchColor.l + amount, 0), 1);
    const adjusted = { ...oklchColor, l: newLightness };

    return rgb(adjusted);
};
