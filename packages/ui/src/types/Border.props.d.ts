import type { Color, ColorLike, Responsive } from "./index";

export interface BorderProps {
    border?: Responsive<string>;

    borderColor?: Responsive<Color | ColorLike>;
    borderRadius?: Responsive<string | number>;
    borderWidth?: Responsive<string | number>;

    borderTop?: Responsive<string>;
    borderTopColor?: Responsive<Color | ColorLike>;
    borderTopWidth?: Responsive<string | number>;
    borderTopStyle?: Responsive<string>;
    borderTopRadius?: Responsive<string | number>;

    borderRight?: Responsive<string>;
    borderRightColor?: Responsive<Color | ColorLike>;
    borderRightWidth?: Responsive<string | number>;
    borderRightStyle?: Responsive<string>;
    borderRightRadius?: Responsive<string | number>;

    borderBottom?: Responsive<string>;
    borderBottomColor?: Responsive<Color | ColorLike>;
    borderBottomWidth?: Responsive<string | number>;
    borderBottomStyle?: Responsive<string>;
    borderBottomRadius?: Responsive<string | number>;

    borderLeft?: Responsive<string>;
    borderLeftColor?: Responsive<Color | ColorLike>;
    borderLeftWidth?: Responsive<string | number>;
    borderLeftStyle?: Responsive<string>;
    borderLeftRadius?: Responsive<string | number>;

    borderX?: Responsive<string>;
    borderXColor?: Responsive<Color | ColorLike>;
    borderXWidth?: Responsive<string | number>;
    borderXStyle?: Responsive<string>;
    borderXRadius?: Responsive<string | number>;

    borderY?: Responsive<string>;
    borderYColor?: Responsive<Color | ColorLike>;
    borderYWidth?: Responsive<string | number>;
    borderYStyle?: Responsive<string>;
    borderYRadius?: Responsive<string | number>;
}
