import type { Color, ColorLike, TypographyColor } from "@ui-types";

export const isThemeColor = (
    color: Color | ColorLike | TypographyColor,
): color is Color => {
    return (
        typeof color === "string" &&
        ["primary", "neutral", "success", "danger", "warning", "info"].includes(
            color,
        )
    );
};

export const isTypographyColor = (
    color: Color | TypographyColor | ColorLike,
): color is TypographyColor => {
    return (
        typeof color === "string" &&
        ["primary", "secondary", "accent", "disabled"].includes(color)
    );
};
