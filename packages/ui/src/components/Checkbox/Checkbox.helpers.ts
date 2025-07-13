import { type Theme } from "@emotion/react";

import { type Color, type ColorLike, type Size } from "@ui-types";
import { adjustTextColor, alpha, getLuminance } from "@utils";
import { resolveColor } from "@utils/resolveColors";
import { resolveSize } from "@utils/resolveSize";
import { formatHex8, parse } from "culori";

const minSize = 10,
    maxSize = 28;

export const baseSizeMap: Record<Size, number> = {
    sm: 16,
    md: 20,
    lg: 24,
};

export const resolveCheckboxStyles = (size: Size | number) => {
    const sizeVal = resolveSize(size, minSize, maxSize, baseSizeMap);

    return {
        padding: sizeVal * 0.2,
        lineHeight: 0,
        fontSize: sizeVal * 0.8,
    };
};

export const variantColors = (
    theme: Theme,
    color: Color | ColorLike,
    checked?: boolean,
) => {
    const { colors } = theme;

    const parsedColor = parse(resolveColor(color, theme));
    if (!parsedColor) throw new Error("Invalid color");

    const resolvedColor = formatHex8(parsedColor);

    const bgLuminance = getLuminance(parsedColor);
    const textColor = parse(
        bgLuminance < 0.5 ? colors.common.white : colors.common.black,
    );
    if (!textColor) throw new Error("Invalid color");

    return {
        solid: {
            backgroundColor: resolvedColor,
            color: formatHex8(adjustTextColor(parsedColor, textColor)),
            border: "none",
            "&:hover": { backgroundColor: alpha(parsedColor, 0.5) },
            "&:active": { backgroundColor: resolvedColor },
        },
        outlined: {
            backgroundColor: "transparent",
            color: resolvedColor,
            border: `1px solid ${alpha(parsedColor, 0.5)}`,
            "&:hover": {
                backgroundColor: alpha(parsedColor, 0.3),
                border: `1px solid ${alpha(parsedColor, 0.3)}`,
            },
            "&:active": {
                backgroundColor: alpha(parsedColor, 0.15),
            },
        },
        soft: {
            backgroundColor: alpha(parsedColor, checked ? 0.4 : 0.2),
            color: resolvedColor,
            border: "none",
            "&:hover": {
                backgroundColor: alpha(parsedColor, 0.3),
            },
            "&:active": {
                backgroundColor: alpha(parsedColor, 0.3),
            },
        },
        plain: {
            backgroundColor: "transparent",
            color: resolvedColor,
            border: "none",
            "&:hover": {
                backgroundColor: alpha(parsedColor, 0.5),
            },
            "&:active": { color: alpha(parsedColor, 0.5) },
        },
    };
};

export const resolveIconScaling = (size: Size | number) => {
    const sizeVal = resolveSize(size, minSize, maxSize, baseSizeMap);

    const scale = sizeVal / 2;

    return {
        width: scale,
        height: scale,
    };
};
