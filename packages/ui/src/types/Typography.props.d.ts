import type { Responsive } from "./index";

import { Properties } from "csstype";

export interface HTMLTypographyProps {
    fontFamily?: Responsive<Properties["fontFamily"]>;
    fontSize?: Responsive<Properties["fontSize"]>;
    fontStyle?: Responsive<Properties["fontStyle"]>;
    fontWeight?: Responsive<Properties["fontWeight"]>;
    letterSpacing?: Responsive<Properties["letterSpacing"]>;
    lineHeight?: Responsive<Properties["lineHeight"]>;
    textAlign?: Responsive<Properties["textAlign"]>;
    textTransform?: Responsive<Properties["textTransform"]>;

    textDecoration?: Responsive<Properties["textDecoration"]>;
    textDecorationLine?: Responsive<Properties["textDecorationLine"]>;
    textDecorationColor?: Responsive<Properties["textDecorationColor"]>;
    textDecorationStyle?: Responsive<Properties["textDecorationStyle"]>;

    textOverflow?: Responsive<Properties["textOverflow"]>;
}
