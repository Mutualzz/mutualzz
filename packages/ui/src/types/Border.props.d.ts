import type { Color, ColorLike, Responsive } from "./index";

import { Properties } from "csstype";

export interface HTMLBorderProps {
    border?: Responsive<Properties["border"]>;

    borderColor?: Responsive<Color | ColorLike | Properties["borderColor"]>;
    borderRadius?: Responsive<Properties["borderRadius"]>;
    borderWidth?: Responsive<Properties["borderWidth"]>;

    borderTop?: Responsive<Properties["borderTop"]>;
    borderTopColor?: Responsive<
        Color | ColorLike | Properties["borderTopColor"]
    >;
    borderTopWidth?: Responsive<Properties["borderTopWidth"]>;
    borderTopStyle?: Responsive<Properties["borderTopStyle"]>;
    borderTopRadius?: Responsive<
        Properties["borderTopLeftRadius"] | Properties["borderTopRightRadius"]
    >;
    borderTopLeftRadius?: Responsive<Properties["borderTopLeftRadius"]>;
    borderTopRightRadius?: Responsive<Properties["borderTopRightRadius"]>;

    borderRight?: Responsive<Properties["borderRight"]>;
    borderRightColor?: Responsive<
        Color | ColorLike | Properties["borderRightColor"]
    >;
    borderRightWidth?: Responsive<Properties["borderRightWidth"]>;
    borderRightStyle?: Responsive<Properties["borderRightStyle"]>;
    borderRightRadius?: Responsive<
        | Properties["borderRightTopRadius"]
        | Properties["borderRightBottomRadius"]
    >;
    borderRightTopRadius?: Responsive<Properties["borderRightTopRadius"]>;
    borderRightBottomRadius?: Responsive<Properties["borderRightBottomRadius"]>;

    borderBottom?: Responsive<Properties["borderBottom"]>;
    borderBottomColor?: Responsive<
        Color | ColorLike | Properties["borderBottomColor"]
    >;
    borderBottomWidth?: Responsive<Properties["borderBottomWidth"]>;
    borderBottomStyle?: Responsive<Properties["borderBottomStyle"]>;
    borderBottomRadius?: Responsive<
        | Properties["borderBottomLeftRadius"]
        | Properties["borderBottomRightRadius"]
    >;
    borderBottomLeftRadius?: Responsive<Properties["borderBottomLeftRadius"]>;
    borderBottomRightRadius?: Responsive<Properties["borderBottomRightRadius"]>;

    borderLeft?: Responsive<Properties["borderLeft"]>;
    borderLeftColor?: Responsive<
        Color | ColorLike | Properties["borderLeftColor"]
    >;
    borderLeftWidth?: Responsive<Properties["borderLeftWidth"]>;
    borderLeftStyle?: Responsive<Properties["borderLeftStyle"]>;
    borderLeftRadius?: Responsive<
        Properties["borderLeftTopRadius"] | Properties["borderLeftBottomRadius"]
    >;
    borderLeftTopRadius?: Responsive<Properties["borderLeftTopRadius"]>;
    borderLeftBottomRadius?: Responsive<Properties["borderLeftBottomRadius"]>;

    borderX?: Responsive<Properties["borderX"]>;
    borderXColor?: Responsive<Color | ColorLike | Properties["borderXColor"]>;
    borderXWidth?: Responsive<Properties["borderXWidth"]>;
    borderXStyle?: Responsive<Properties["borderXStyle"]>;
    borderXRadius?: Responsive<
        Properties["borderLeftTopRadius"] | Properties["borderLeftBottomRadius"]
    >;
    borderXTopRadius?: Responsive<Properties["borderLeftTopRadius"]>;
    borderXBottomRadius?: Responsive<Properties["borderLeftBottomRadius"]>;

    borderY?: Responsive<Properties["borderY"]>;
    borderYColor?: Responsive<Color | ColorLike | Properties["borderYColor"]>;
    borderYWidth?: Responsive<Properties["borderYWidth"]>;
    borderYStyle?: Responsive<Properties["borderYStyle"]>;
    borderYRadius?: Responsive<
        Properties["borderLeftTopRadius"] | Properties["borderLeftBottomRadius"]
    >;
    borderYTopRadius?: Responsive<Properties["borderLeftTopRadius"]>;
    borderYBottomRadius?: Responsive<Properties["borderLeftBottomRadius"]>;
}
