import type { Theme } from "@emotion/react";
import { type Color, type ColorLike, type TypographyColor } from "@ui-types";
import { useTheme } from "../hooks/useTheme";
import { isThemeColor, isTypographyColor } from "./isThemeColor";

export const resolveColor = (color: Color | ColorLike, theme: Theme) =>
    isThemeColor(color) ? theme.colors[color] : color;

export const useResolvedColor = (color: Color | ColorLike) => {
    const { theme } = useTheme();
    return resolveColor(color, theme);
};

export const resolveTypographyColor = (
    color: TypographyColor | ColorLike,
    theme: Theme,
) => (isTypographyColor(color) ? theme.typography.colors[color] : color);

export const useResolvedTypographyColor = (
    color: TypographyColor | ColorLike,
): TypographyColor | ColorLike => {
    const { theme } = useTheme();
    return resolveTypographyColor(color, theme);
};
