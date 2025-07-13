import type { Color } from "culori";
import { getLuminance } from "./getLuminance";

export const getContrastRatio = (color1: Color, color2: Color): number => {
    const lum1 = getLuminance(color1);
    const lum2 = getLuminance(color2);
    const [lighter, darker] = lum1 > lum2 ? [lum1, lum2] : [lum2, lum1];
    return (lighter + 0.05) / (darker + 0.05);
};
