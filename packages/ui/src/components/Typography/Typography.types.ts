import type { Color, ColorLike, TypographyLevel, Variant } from "@ui-types";
import type { Properties } from "csstype";
import { type HTMLAttributes } from "react";

export type TypographyVariant = Variant | "none";

export interface TypographyProps extends HTMLAttributes<HTMLSpanElement> {
    /**
     * Typography Level.
     * This can be a predefined level like "h1", "h2", and etc.
     * @default "body-md"
     */
    level?: TypographyLevel;
    /**
     * Font weight.
     * This can be a predefined weight like "light", "normal", "medium", "bold", or a custom number.
     * It determines the thickness of the text.
     */
    weight?: Properties["fontWeight"];
    /**
     * Color or color-like value for the typography.
     * This can be a color name, hex code, or any valid color format, doesn't apply on "none" variant.
     */
    color?: Color | ColorLike;
    /**
     * Variant of the typography.
     * This can be "solid", "outlined", "soft", "plain", or "none".
     * It determines the visual style of the typography.
     * "none" variant will not apply any styles.
     * It is useful for cases where you want to use the typography component without any additional styles.
     * @default "none"
     */
    variant?: TypographyVariant;
}
