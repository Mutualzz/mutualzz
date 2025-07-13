import { type Color, type ColorLike, type TypographyColor } from "@ui-types";
import type { HTMLAttributes, ReactNode } from "react";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerInset = "none" | "start" | "end";

export type DividerVariant = "solid" | "dashed" | "dotted" | "double";

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
    /**
     * The orientation of the divider.
     * Can be "horizontal" or "vertical".
     * @default "horizontal"
     */
    orientation?: DividerOrientation;
    /**
     * The inset of the divider.
     * Determines how the divider is positioned relative to its container.
     * Can be "none", "start", or "end".
     * @default "none"
     */
    inset?: DividerInset;

    /**
     * The color of the divider line.
     * Can be a predefined color or a custom color.
     * @default "neutral"
     */
    lineColor?: Color | ColorLike | TypographyColor;
    /**
     * The color of the divider text.
     * Can be a predefined color or a custom color.
     * @default "neutral"
     */
    textColor?: Color | ColorLike | TypographyColor;
    /**
     * The variant of the divider.
     * Determines the style of the divider line.
     * Can be "solid", "dashed", "dotted", or "double".
     * @default "solid"
     */
    variant?: DividerVariant;

    /**
     * Optional children to render inside the divider.
     * This can be used to display text or other content in the divider.
     */
    children?: ReactNode;
}
