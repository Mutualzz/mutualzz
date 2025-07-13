import type { Properties } from "csstype";
import type { Responsive } from "./index";

export interface HTMLShadowsProps {
    boxShadow?: Responsive<Properties["boxShadow"]>;
}
