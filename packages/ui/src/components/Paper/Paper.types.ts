import {
    type Color,
    type ColorLike,
    type TypographyColor,
    type Variant,
} from "@ui-types";

export type PaperVariant = Variant | "elevation";

export interface PaperProps {
    /**
     * The color of the Paper component.
     * Can be a color name or a color value.
     * @default "neutral"
     */
    color?: Color | ColorLike;
    /**
     * The text color of the Paper component.
     * Can be a color name or a color value.
     * @default "inherit"
     */
    textColor?: TypographyColor | "inherit";
    /**
     * The variant of the Paper component.
     * Can be "elevation", "solid", "outlined", "plain", or "soft".
     * @default "elevation"
     */
    variant?: PaperVariant;

    /**
     * Elevation level for the Paper component.
     * This is only applicable for the "elevation" variant.
     * It determines the shadow and background color.
     * @default 0
     */
    elevation?: number;
}
