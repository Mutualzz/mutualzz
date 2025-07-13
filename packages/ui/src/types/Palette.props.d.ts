import type { Color, ColorLike, Responsive, TypographyColor } from "../index";

export interface PalleteProps {
    color?: Responsive<Color | TypographyColor | ColorLike>;
    bgColor?: Responsive<Color | TypographyColor | ColorLike>;
}
