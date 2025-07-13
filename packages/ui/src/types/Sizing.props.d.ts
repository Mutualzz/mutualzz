import type { Responsive } from "./index";

import { Properties } from "csstype";

export interface HTMLSizingProps {
    width?: Responsive<Properties["width"]>;
    minWidth?: Responsive<Properties["minWidth"]>;
    maxWidth?: Responsive<Properties["maxWidth"]>;
    height?: Responsive<Properties["height"]>;
    minHeight?: Responsive<Properties["minHeight"]>;
    maxHeight?: Responsive<Properties["maxHeight"]>;

    boxSizing?: Responsive<Properties["boxSizing"]>;
}
