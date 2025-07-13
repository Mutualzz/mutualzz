import type { Responsive } from "./index";

import { Properties } from "csstype";

export interface HTMLSpacingProps {
    gap?: Responsive<Properties["gap"]>;
    spacing?: Responsive<Properties["gap"]>;

    rowGap?: Responsive<Properties["rowGap"]>;
    columnGap?: Responsive<Properties["columnGap"]>;

    m?: Responsive<Properties["margin"]>;
    mt?: Responsive<Properties["marginTop"]>;
    mr?: Responsive<Properties["marginRight"]>;
    mb?: Responsive<Properties["marginBottom"]>;
    ml?: Responsive<Properties["marginLeft"]>;
    mx?: Responsive<Properties["marginInline"]>;
    my?: Responsive<Properties["marginBlock"]>;

    p?: Responsive<Properties["padding"]>;
    pt?: Responsive<Properties["paddingTop"]>;
    pr?: Responsive<Properties["paddingRight"]>;
    pb?: Responsive<Properties["paddingBottom"]>;
    pl?: Responsive<Properties["paddingLeft"]>;
    px?: Responsive<Properties["paddingInline"]>;
    py?: Responsive<Properties["paddingBlock"]>;

    margin?: Responsive<Properties["margin"]>;
    marginTop?: Responsive<Properties["marginTop"]>;
    marginRight?: Responsive<Properties["marginRight"]>;
    marginBottom?: Responsive<Properties["marginBottom"]>;
    marginLeft?: Responsive<Properties["marginLeft"]>;
    marginX?: Responsive<Properties["marginInline"]>;
    marginY?: Responsive<Properties["marginBlock"]>;

    padding?: Responsive<Properties["padding"]>;
    paddingTop?: Responsive<Properties["paddingTop"]>;
    paddingRight?: Responsive<Properties["paddingRight"]>;
    paddingBottom?: Responsive<Properties["paddingBottom"]>;
    paddingLeft?: Responsive<Properties["paddingLeft"]>;
    paddingX?: Responsive<Properties["paddingInline"]>;
    paddingY?: Responsive<Properties["paddingBlock"]>;
}
