import type { Theme } from "@emotion/react";
import type { Color, ColorLike, Size } from "@ui-types";

import { alpha } from "@utils";
import { resolveColor } from "@utils/resolveColors";
import { resolveSize } from "@utils/resolveSize";
import { formatHex8, parse } from "culori";

const minLength = 80,
    maxLength = 240;
const minThickness = 4,
    maxThickness = 16;

export const variantColors = (theme: Theme, color: Color | ColorLike) => {
    const parsedColor = parse(resolveColor(color, theme));
    if (!parsedColor)
        return {
            plain: "transparent",
            solid: "transparent",
            soft: "transparent",
            outlined: "transparent",
        };

    return {
        plain: "transparent",
        solid: formatHex8(alpha(parsedColor, 0.5))!,
        soft: formatHex8(alpha(parsedColor, 0.1))!,
        outlined: "transparent",
    };
};

export const thicknessMap: Record<Size, number> = {
    sm: 4,
    md: 6,
    lg: 8,
};

export const lengthMap: Record<Size, number> = {
    sm: 120,
    md: 160,
    lg: 200,
};

export const resolveThickness = (thickness: Size | number) =>
    resolveSize(thickness, minThickness, maxThickness, thicknessMap);

export const resolveLength = (length: Size | number) =>
    resolveSize(length, minLength, maxLength, lengthMap);
