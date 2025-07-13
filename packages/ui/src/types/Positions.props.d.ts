import type { Theme } from "@emotion/react";
import type { Properties } from "csstype";
import { type Responsive } from "./index";

export interface HTMLPositionsProps {
    position?: Responsive<Properties["position"]>;
    zIndex?: Responsive<Properties["zIndex"] | keyof Theme["zIndex"]>;
    top?: Responsive<Properties["top"]>;
    right?: Responsive<Properties["right"]>;
    bottom?: Responsive<Properties["bottom"]>;
    left?: Responsive<Properties["left"]>;
}
