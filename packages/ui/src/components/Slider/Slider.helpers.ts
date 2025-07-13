import type { CSSObject, Theme } from "@emotion/react";
import type { Color, ColorLike, Size, Variant } from "@ui-types";
import { alpha, lighten } from "@utils";
import { resolveColor } from "@utils/resolveColors";
import { resolveSize } from "@utils/resolveSize";
import { formatHex8, parse } from "culori";

const minThumbSize = 10,
    maxThumbSize = 28;

const minFontSize = 10,
    maxFontSize = 16;

const thumbSizeMap: Record<Size, number> = {
    sm: 14,
    md: 18,
    lg: 24,
};

export const resolveSliderThumbSize = (size: Size | number): CSSObject => {
    const sizeVal = resolveSize(size, minThumbSize, maxThumbSize, thumbSizeMap);

    return {
        width: sizeVal,
        height: sizeVal,
        borderRadius: sizeVal / 2,
    };
};

export const resolveSliderTrackThickness = (size: Size | number) => {
    const sizeVal = resolveSize(size, minThumbSize, maxThumbSize, thumbSizeMap);

    return Math.round(sizeVal / 2.5);
};

export const resolveSliderTickSize = (size: Size | number): CSSObject => {
    const sizeVal = resolveSize(size, minThumbSize, maxThumbSize, thumbSizeMap);

    const tickSize = Math.round(sizeVal * 0.2);

    return {
        width: tickSize,
        height: tickSize,
    };
};

export const resolveSliderLabelSize = (theme: Theme, size: Size | number) => {
    let base = size;
    if (typeof base === "string") base = parseFloat(base);
    if (isNaN(base)) {
        switch (size) {
            case "sm":
                base = theme.typography.levels["body-xs"].fontSize;
                break;
            case "md":
                base = theme.typography.levels["body-sm"].fontSize;
                break;
            case "lg":
                base = theme.typography.levels["body-md"].fontSize;
                break;
        }
    }

    if (base < minFontSize) base = minFontSize;
    if (base > maxFontSize) base = maxFontSize;

    return base;
};

export const resolveSliderTrackStyles = (
    theme: Theme,
    color: Color | ColorLike,
    hovered: boolean,
): Record<Variant, CSSObject> => {
    const parsedColor = parse(resolveColor(color, theme));
    if (!parsedColor) throw new Error(`Invalid color: ${color}`);

    return {
        solid: {
            backgroundColor: hovered
                ? formatHex8(alpha(parsedColor, 0.85))
                : formatHex8(parsedColor),
        },
        outlined: {
            border: hovered
                ? `1px solid ${formatHex8(alpha(parsedColor, 0.5))}`
                : `1px solid ${formatHex8(parsedColor)}`,
            backgroundColor: hovered
                ? formatHex8(alpha(parsedColor, 0.35))
                : "transparent",
        },
        plain: {
            backgroundColor: hovered
                ? formatHex8(alpha(parsedColor, 0.5))
                : "transparent",
        },
        soft: {
            backgroundColor: hovered
                ? formatHex8(alpha(parsedColor, 0.5))
                : formatHex8(alpha(parsedColor, 0.3)),
        },
    };
};

export const resolveSliderThumbStyles = (
    theme: Theme,
    color: Color | ColorLike,
    hovered: boolean,
): Record<Variant, CSSObject> => {
    const { colors } = theme;

    const parsedColor = parse(resolveColor(color, theme));
    if (!parsedColor) throw new Error(`Invalid color: ${color}`);

    return {
        solid: {
            backgroundColor: colors.common.white,
            border: hovered
                ? `2px solid ${formatHex8(alpha(parsedColor, 0.85))}`
                : `2px solid ${formatHex8(parsedColor)}`,
        },
        outlined: {
            padding: 2,
            backgroundColor: formatHex8(lighten(parsedColor, 0.7)),
            border: `1px solid ${formatHex8(parsedColor)}`,
        },
        plain: {
            backgroundColor: formatHex8(lighten(parsedColor, 0.5)),
        },
        soft: {
            backgroundColor: hovered
                ? formatHex8(lighten(parsedColor, 0.5))
                : formatHex8(lighten(parsedColor, 0.7)),
            border: hovered
                ? `2px solid ${formatHex8(alpha(parsedColor, 0.85))}`
                : `2px solid ${formatHex8(parsedColor)}`,
        },
    };
};
