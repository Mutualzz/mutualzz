import type { Theme } from "@emotion/react";
import { type Responsive } from "./index";

export type Position =
    | "static"
    | "relative"
    | "absolute"
    | "fixed"
    | "sticky"
    | "inherit"
    | "initial"
    | "unset"
    | "revert";

export type ZIndex = number | "auto";

export type PositionOffset =
    | string
    | number
    | "auto"
    | "inherit"
    | "initial"
    | "unset"
    | "revert";

export interface PositionsProps {
    position?: Responsive<Position>;
    zIndex?: Responsive<ZIndex | keyof Theme["zIndex"]>;
    top?: Responsive<PositionOffset>;
    right?: Responsive<PositionOffset>;
    bottom?: Responsive<PositionOffset>;
    left?: Responsive<PositionOffset>;
}
