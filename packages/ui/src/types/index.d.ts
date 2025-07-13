import type { HTMLAttributes } from "react";
import type { BorderProps } from "./Border.props";
import type { DisplayProps } from "./Display.props";
import type { FlexboxProps } from "./Flexbox.props";
import type { PositionsProps } from "./Positions.props";
import type { ShadowsProps } from "./Shadows.props";
import type { SizingProps } from "./Sizing.props";
import type { SpacingProps } from "./Spacing.props";
import type { TypographyProps } from "./Typography.props";

export type Hex = `#${string}`;
export type RGB = `rgb(${number}, ${number}, ${number})`;
export type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type HSL = `hsl(${number}, ${number}%, ${number}%)`;
export type HSLA = `hsla(${number}, ${number}%, ${number}%, ${number})`;

export type ColorLike = Hex | RGB | RGBA | HSL | HSLA;

export type Color =
    | "primary"
    | "neutral"
    | "success"
    | "danger"
    | "warning"
    | "info";

export type TypographyColor = "primary" | "secondary" | "accent" | "disabled";

export type Variant = "plain" | "outlined" | "soft" | "solid";

export type TypographyDisplayKey =
    | "display-xs"
    | "display-sm"
    | "display-md"
    | "display-lg";
export type TypographyHeadingKey = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type TypographyTitleKey = "title-sm" | "title-md" | "title-lg";
export type TypographyBodyKey = "body-xs" | "body-sm" | "body-md" | "body-lg";

export type TypographyLevel =
    | TypographyBodyKey
    | TypographyTitleKey
    | TypographyHeadingKey
    | TypographyDisplayKey;

export type TypographyLevelObj = {
    fontSize: number;
    lineHeight: string | number;
    fontWeight: string | number;
    letterSpacing: string | number;
};

export type Size = "sm" | "md" | "lg";

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";
export type Spacing = "xs" | "sm" | "md" | "lg" | "xl";

export type Responsive<T> = T | Partial<Record<Breakpoint, T>>;
export type ThemeMode = "light" | "dark" | "system";

export type SystemProps = HTMLAttributes<HTMLElement> &
    BorderProps &
    DisplayProps &
    FlexboxProps &
    // PalleteProps &
    PositionsProps &
    ShadowsProps &
    SizingProps &
    SpacingProps &
    TypographyProps;

export interface MZTheme {
    id: string;
    name: string;
    description: string;
    type: "light" | "dark";
    colors: {
        common: {
            white: ColorLike;
            black: ColorLike;
        };

        // Base Colors
        primary: ColorLike;
        neutral: ColorLike;
        background: ColorLike;
        surface: ColorLike;

        // Feedback colors
        danger: ColorLike;
        warning: ColorLike;
        info: ColorLike;
        success: ColorLike;
    };
    typography: {
        fontFamily: string;
        colors: {
            primary: ColorLike;
            secondary: ColorLike;
            accent: ColorLike;
            disabled: ColorLike;
        };
        levels: {
            [key in TypographyLevel]: TypographyLevelObj;
        };
    };
    breakpoints: {
        keys: Breakpoint[];
        values: { [key in Breakpoint]: number };
        up: (key: Breakpoint) => string;
        down: (key: Breakpoint) => string;
        between: (start: Breakpoint, end: Breakpoint) => string;
        only: (key: Breakpoint) => string;
        not: (key: Breakpoint) => string;
    };
    spacing: (factor: number) => string;

    shadows: string[];

    zIndex: {
        mobileStepper: number;
        fab: number;
        speedDial: number;
        appBar: number;
        drawer: number;
        modal: number;
        snackbar: number;
        tooltip: number;
    };
}

declare module "@emotion/react" {
    export interface Theme extends MZTheme {}
}
