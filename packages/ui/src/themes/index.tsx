import type { Theme } from "@emotion/react";
import { baseDarkTheme } from "./baseDark";
import { baseLightTheme } from "./baseLight";

export { baseDarkTheme } from "./baseDark";
export { baseLightTheme } from "./baseLight";

export const themesObj: Record<string, Theme> = {
    baseDark: baseDarkTheme,
    baseLight: baseLightTheme,
};

export const themes = Object.values(themesObj);
