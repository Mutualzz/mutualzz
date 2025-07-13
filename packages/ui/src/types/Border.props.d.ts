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
    borderBottom?: Responsive<Properties["borderBottom"]>;
    borderBottomColor?: Responsive<
        Color | ColorLike | Properties["borderBottomColor"]
    >;
    borderBottomWidth?: Responsive<Properties["borderBottomWidth"]>;
    borderBottomStyle?: Responsive<Properties["borderBottomStyle"]>;
    borderLeft?: Responsive<Properties["borderLeft"]>;
    borderLeftColor?: Responsive<
        Color | ColorLike | Properties["borderLeftColor"]
    >;
    borderLeftWidth?: Responsive<Properties["borderLeftWidth"]>;
    borderLeftStyle?: Responsive<Properties["borderLeftStyle"]>;
}
