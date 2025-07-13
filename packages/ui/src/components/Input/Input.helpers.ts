import type { CSSObject, Theme } from "@emotion/react";
import type {
    Color,
    ColorLike,
    Size,
    TypographyColor,
    Variant,
} from "@ui-types";
import { darken, lighten } from "@utils";
import { resolveColor, resolveTypographyColor } from "@utils/resolveColors";
import { resolveSize } from "@utils/resolveSize";
import { formatHex8, parse } from "culori";

const minSize = 6,
    maxSize = 24;

const baseSizeMap: Record<Size, number> = {
    sm: 12,
    md: 14,
    lg: 16,
};

export const resolveInputSize = (size: Size | number) => {
    const sizeVal = resolveSize(size, minSize, maxSize, baseSizeMap);

    return {
        fontSize: sizeVal,
        lineHeight: 1,
        minHeight: `${sizeVal + (sizeVal / 2) * 2}px`,
        whiteSpace: "nowrap",
        flexShrink: 0,
    };
};

export const resolvePasswordIconColor = (
    theme: Theme,
    color: Color | ColorLike,
): Record<Variant, string> => {
    const parsedColor = parse(resolveColor(color, theme));
    if (!parsedColor) throw new Error("Invalid color");

    return {
        outlined: formatHex8(parsedColor),
        solid: formatHex8(lighten(parsedColor, 1)),
        plain: formatHex8(parsedColor),
        soft: formatHex8(lighten(parsedColor, 0.25)),
    };
};

export const resolveInputStyles = (
    theme: Theme,
    color: Color | ColorLike,
    textColor: TypographyColor | "inherit",
): Record<Variant, CSSObject> => {
    const parsedColor = parse(resolveColor(color, theme));
    if (!parsedColor) throw new Error("Invalid color");

    const parsedTextColor =
        textColor === "inherit"
            ? parsedColor
            : parse(resolveTypographyColor(textColor, theme));
    if (!parsedTextColor) throw new Error("Invalid text color");

    return {
        outlined: {
            background: "transparent",
            color: formatHex8(lighten(parsedTextColor, 0.5)),
            border: `1px solid ${formatHex8(parsedColor)}`,
            borderRadius: 8,
            ":focus": {
                outline: `2px solid ${formatHex8(parsedColor)}`,
            },
        },
        solid: {
            background: formatHex8(parsedColor),
            color: formatHex8(lighten(parsedTextColor, 0.75)),
            border: "none",
            borderRadius: 8,
            ":focus": {
                outline: `2px solid ${formatHex8(parsedColor)}`,
            },
        },
        plain: {
            background: "transparent",
            color: formatHex8(lighten(parsedTextColor, 0.25)),
            border: "none",
            borderRadius: 8,
            ":focus": {
                outline: `2px solid ${formatHex8(parsedColor)}`,
            },
        },
        soft: {
            background: formatHex8(darken(parsedColor, 0.5)),
            color: formatHex8(lighten(parsedTextColor, 0.5)),
            border: "none",
            borderRadius: 8,
            ":focus": {
                outline: `2px solid ${formatHex8(parsedColor)}`,
            },
        },
    };
};
