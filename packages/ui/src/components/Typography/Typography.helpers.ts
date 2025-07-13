import type { Theme } from "@emotion/react";
import { type Color, type ColorLike } from "@ui-types";
import { adjustTextColor, alpha, getLuminance } from "@utils";
import { resolveColor } from "@utils/resolveColors";
import { formatHex8, parse } from "culori";

export const variantStyles = (theme: Theme, color: Color | ColorLike) => {
    const { colors } = theme;

    const parsedColor = parse(resolveColor(color, theme));
    if (!parsedColor) throw new Error("Invalid color");

    const bgLuminance = getLuminance(parsedColor);
    const textColor = parse(
        bgLuminance < 0.5 ? colors.common.white : colors.common.black,
    );
    if (!textColor) throw new Error("Invalid color");

    return {
        solid: {
            backgroundColor: formatHex8(parsedColor),
            color: formatHex8(adjustTextColor(parsedColor, textColor)),
            border: "none",
        },
        outlined: {
            backgroundColor: "transparent",
            color: formatHex8(parsedColor),
            border: `1px solid ${formatHex8(parsedColor)}`,
        },
        plain: {
            backgroundColor: "transparent",
            color: formatHex8(parsedColor),
            border: "none",
        },
        soft: {
            backgroundColor: alpha(parsedColor, 0.4),
            color: formatHex8(parsedColor),
            border: "none",
        },
        none: {
            backgroundColor: "transparent",
            border: "none",
        },
    };
};
