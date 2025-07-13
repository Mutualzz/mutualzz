import type { Responsive } from "./index";

export type Size =
    | string
    | number
    | "auto"
    | "fit-content"
    | "min-content"
    | "max-content"
    | "inherit"
    | "initial"
    | "unset"
    | "revert";

export type BoxSizing =
    | "content-box"
    | "border-box"
    | "inherit"
    | "initial"
    | "unset"
    | "revert";

export interface SizingProps {
    width?: Responsive<Size>;
    minWidth?: Responsive<Size>;
    maxWidth?: Responsive<Size>;
    height?: Responsive<Size>;
    minHeight?: Responsive<Size>;
    maxHeight?: Responsive<Size>;

    boxSizing?: Responsive<BoxSizing>;
}
