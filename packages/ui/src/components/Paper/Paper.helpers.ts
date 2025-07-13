import type { Theme } from "@emotion/react";
import { type Color, type ColorLike, type TypographyColor } from "@ui-types";
import { adjustTextColor, alpha, dynamicElevation, getLuminance } from "@utils";
import { resolveColor, resolveTypographyColor } from "@utils/resolveColors";
import { formatHex8, parse } from "culori";

export const variantStyles = (
    theme: Theme,
    color: Color | ColorLike,
    textColor: TypographyColor | "inherit",
    elevation: number,
) => {
    const { colors } = theme;

    const parsedColor = parse(resolveColor(color, theme));
    if (!parsedColor) throw new Error("Invalid color");

    const bgLuminance = getLuminance(parsedColor);

    const parsedTextColor =
        textColor === "inherit"
            ? parsedColor
            : parse(resolveTypographyColor(textColor, theme));

    if (!parsedTextColor) throw new Error("Invalid text color");

    const solidTextColor = parse(
        bgLuminance < 0.5 ? colors.common.white : colors.common.black,
    );
    if (!solidTextColor) throw new Error("Invalid color");

    return {
        elevation: {
            backgroundColor: dynamicElevation(colors.surface, elevation),
            boxShadow: `0 ${elevation + 1}px ${elevation * 2}px rgba(0,0,0,${elevation * 0.1})`,
        },
        solid: {
            backgroundColor: formatHex8(parsedColor),
            color: formatHex8(adjustTextColor(parsedTextColor, solidTextColor)),
            border: "none",
        },
        outlined: {
            backgroundColor: "transparent",
            border: `1px solid ${formatHex8(parsedColor)}`,
            color: formatHex8(parsedTextColor),
        },
        plain: {
            backgroundColor: "transparent",
            border: "none",
            color: formatHex8(parsedTextColor),
        },
        soft: {
            backgroundColor: alpha(parsedColor, 0.1),
            border: "none",
            color: formatHex8(parsedTextColor),
        },
    };
};
