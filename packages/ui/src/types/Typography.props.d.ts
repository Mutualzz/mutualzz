import type { Color, ColorLike, Responsive, TypographyColor } from "./index";

export type FontStyle =
    | "normal"
    | "italic"
    | "oblique"
    | "inherit"
    | "initial"
    | "unset"
    | "revert";

export type FontWeight =
    | "normal"
    | "bold"
    | "lighter"
    | "bolder"
    | number
    | "inherit"
    | "initial"
    | "unset"
    | "revert";

export type TextAlign =
    | "left"
    | "right"
    | "center"
    | "justify"
    | "start"
    | "end"
    | "inherit"
    | "initial"
    | "unset"
    | "revert";

export type TextTransform =
    | "none"
    | "capitalize"
    | "uppercase"
    | "lowercase"
    | "full-width"
    | "full-size-kana"
    | "inherit"
    | "initial"
    | "unset"
    | "revert";

export type TextDecoration =
    | "none"
    | "underline"
    | "overline"
    | "line-through"
    | "blink"
    | "inherit"
    | "initial"
    | "unset"
    | "revert"
    | string;

export type TextDecorationLine =
    | "none"
    | "underline"
    | "overline"
    | "line-through"
    | "blink" // deprecated
    | "inherit"
    | "initial"
    | "unset"
    | "revert";

export type TextDecorationStyle =
    | "solid"
    | "double"
    | "dotted"
    | "dashed"
    | "wavy"
    | "inherit"
    | "initial"
    | "unset"
    | "revert";

export type TextOverflow =
    | "clip"
    | "ellipsis"
    | "inherit"
    | "initial"
    | "unset"
    | "revert";

export interface TypographyProps {
    fontFamily?: Responsive<string>;
    fontSize?: Responsive<string | number>;
    fontStyle?: Responsive<FontStyle>;
    fontWeight?: Responsive<FontWeight>;
    letterSpacing?: Responsive<string | number>;
    lineHeight?: Responsive<string | number>;
    textAlign?: Responsive<TextAlign>;
    textTransform?: Responsive<TextTransform>;

    textDecoration?: Responsive<TextDecoration>;
    textDecorationLine?: Responsive<TextDecorationLine>;
    textDecorationColor?: Responsive<Color | ColorLike | TypographyColor>;
    textDecorationStyle?: Responsive<TextDecorationStyle>;

    textOverflow?: Responsive<TextOverflow>;
}
