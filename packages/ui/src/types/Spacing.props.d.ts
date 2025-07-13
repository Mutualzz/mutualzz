import type { Responsive } from "./index";

export interface SpacingProps {
    gap?: Responsive<string | number>;
    spacing?: Responsive<string | number>;

    rowGap?: Responsive<string | number>;
    columnGap?: Responsive<string | number>;

    m?: Responsive<string | number>;
    mt?: Responsive<string | number>;
    mr?: Responsive<string | number>;
    mb?: Responsive<string | number>;
    ml?: Responsive<string | number>;
    mx?: Responsive<string | number>;
    my?: Responsive<string | number>;

    p?: Responsive<string | number>;
    pt?: Responsive<string | number>;
    pr?: Responsive<string | number>;
    pb?: Responsive<string | number>;
    pl?: Responsive<string | number>;
    px?: Responsive<string | number>;
    py?: Responsive<string | number>;

    margin?: Responsive<string | number>;
    marginTop?: Responsive<string | number>;
    marginRight?: Responsive<string | number>;
    marginBottom?: Responsive<string | number>;
    marginLeft?: Responsive<string | number>;
    marginX?: Responsive<string | number>;
    marginY?: Responsive<string | number>;

    padding?: Responsive<string | number>;
    paddingTop?: Responsive<string | number>;
    paddingRight?: Responsive<string | number>;
    paddingBottom?: Responsive<string | number>;
    paddingLeft?: Responsive<string | number>;
    paddingX?: Responsive<string | number>;
    paddingY?: Responsive<string | number>;
}
