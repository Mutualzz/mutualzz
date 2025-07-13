import type { Responsive } from "./index";

import type { Properties } from "csstype";

export interface HTMLFlexboxProps {
    flexDirection?: Responsive<Properties["flexDirection"]>;
    direction?: Responsive<Properties["flexDirection"]>;

    flexWrap?: Responsive<Properties["flexWrap"]>;
    wrap?: Responsive<Properties["flexWrap"]>;

    justifyContent?: Responsive<Properties["justifyContent"]>;
    alignItems?: Responsive<Properties["alignItems"]>;
    alignContent?: Responsive<Properties["alignContent"]>;

    order?: Responsive<Properties["order"]>;

    flex?: Responsive<Properties["flex"]>;

    flexGrow?: Responsive<Properties["flexGrow"]>;
    grow?: Responsive<Properties["flexGrow"]>;

    flexShrink?: Responsive<Properties["flexShrink"]>;
    shrink?: Responsive<Properties["flexShrink"]>;

    alignSelf?: Responsive<Properties["alignSelf"]>;
}
