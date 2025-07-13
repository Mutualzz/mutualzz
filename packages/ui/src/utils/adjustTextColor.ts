import type { Color } from "culori";
import { adjustLightness } from "./adjustLightness";
import { getContrastRatio } from "./getContrastRatio";
import { getLuminance } from "./getLuminance";

export const adjustTextColor = (
    background: Color,
    textColor: Color,
    targetRatio = 4.5,
    maxIterations = 10,
    adjustmentStep = 0.05,
): Color => {
    let contrast = getContrastRatio(background, textColor);
    if (contrast >= targetRatio) return textColor;

    let adjusted = textColor;
    const isTextLighter = getLuminance(textColor) > getLuminance(background);

    for (let i = 0; i < maxIterations; i++) {
        adjusted = adjustLightness(
            adjusted,
            isTextLighter ? -adjustmentStep : adjustmentStep,
        );

        contrast = getContrastRatio(background, adjusted);
        if (contrast >= targetRatio) {
            return adjusted;
        }
    }

    // 🚨 Fallback: force high-contrast if no good match
    const fallbackIsDarkBg = getLuminance(background) < 0.5;
    return fallbackIsDarkBg
        ? { mode: "rgb", r: 255, g: 255, b: 255 }
        : { mode: "rgb", r: 0, g: 0, b: 0 };
};
