import type { Responsive } from "./index";

export type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";
export type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";
export type JustifyContent =
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "start"
    | "end"
    | "left"
    | "right";

export type AlignContent =
    | "stretch"
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "start"
    | "end";

export type Flex = "none" | "auto" | "initial" | "inherit" | string | number;

export type AlignSelf =
    | "auto"
    | "stretch"
    | "flex-start"
    | "flex-end"
    | "center"
    | "baseline"
    | "start"
    | "end"
    | "self-start"
    | "self-end";

export type AlignItems =
    | "stretch"
    | "flex-start"
    | "flex-end"
    | "center"
    | "baseline"
    | "start"
    | "end"
    | "self-start"
    | "self-end";

export interface FlexboxProps {
    flexDirection?: Responsive<FlexDirection>;
    direction?: Responsive<FlexDirection>;

    flexWrap?: Responsive<FlexWrap>;
    wrap?: Responsive<FlexWrap>;

    justifyContent?: Responsive<JustifyContent>;
    alignItems?: Responsive<AlignItems>;
    alignContent?: Responsive<AlignContent>;

    order?: Responsive<number>;

    flex?: Responsive<Flex>;

    flexGrow?: Responsive<number>;
    grow?: Responsive<number>;

    flexShrink?: Responsive<number>;
    shrink?: Responsive<number>;

    alignSelf?: Responsive<AlignSelf>;
}
