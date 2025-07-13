import type { Responsive } from ".";

export type Display =
    | "block"
    | "inline"
    | "inline-block"
    | "none"
    | "contents"
    | "flex"
    | "inline-flex"
    | "grid"
    | "inline-grid"
    | "flow"
    | "flow-root"
    | "table"
    | "inline-table"
    | "table-caption"
    | "table-cell"
    | "table-column"
    | "table-column-group"
    | "table-footer-group"
    | "table-header-group"
    | "table-row"
    | "table-row-group"
    | "ruby"
    | "ruby-base"
    | "ruby-text"
    | "ruby-base-container"
    | "ruby-text-container"
    | "list-item"
    | "run-in"
    | "inherit"
    | "initial"
    | "unset"
    | "revert";

export type Overflow =
    | "visible"
    | "hidden"
    | "clip"
    | "scroll"
    | "auto"
    | "inherit"
    | "initial"
    | "unset"
    | "revert";

export type Visibility =
    | "visible"
    | "hidden"
    | "collapse"
    | "inherit"
    | "initial"
    | "unset"
    | "revert";

export type WhiteSpace =
    | "normal"
    | "nowrap"
    | "pre"
    | "pre-wrap"
    | "pre-line"
    | "break-spaces"
    | "inherit"
    | "initial"
    | "unset"
    | "revert";

export interface DisplayProps {
    display?: Responsive<Display>;

    overflow?: Responsive<Overflow>;
    overflowX?: Responsive<Overflow>;
    overflowY?: Responsive<Overflow>;

    visibility?: Responsive<Visibility>;

    whiteSpace?: Responsive<WhiteSpace>;
}
