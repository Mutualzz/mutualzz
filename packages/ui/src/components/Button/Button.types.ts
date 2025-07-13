import { type Color, type ColorLike, type Size, type Variant } from "@ui-types";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

export type ButtonGroupOrientation = "horizontal" | "vertical";

export interface ButtonProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
    /**
     * The variant of the button, which determines its style.
     * @default "solid"
     */
    variant?: Variant;
    /**
     * The color of the button, which can be a predefined color or a custom color.
     * @default "primary"
     */
    color?: Color | ColorLike;
    /**
     * The size of the button, which can be a predefined size or a custom size in pixels.
     * @default "md"
     */
    size?: Size | number;

    /**
     * Indicates whether the button is in a loading state.
     * If true, the button will show a loading indicator and be disabled.
     * @default false
     */
    loading?: boolean;
    /**
     * Custom loading indicator to display when the button is in a loading state.
     * If not provided, a default loading spinner will be shown.
     */
    loadingIndicator?: ReactNode;

    /**
     * Content to display at the start of the button (e.g., an icon).
     */
    startDecorator?: ReactNode;
    /**
     * Content to display at the end of the button (e.g., an icon).
     */
    endDecorator?: ReactNode;
}

export interface ButtonGroupProps {
    /**
     * The color of the button group, which can be a predefined color or a custom color.
     * If not provided, the buttons will use their assigned colors.
     */
    color?: Color | ColorLike;
    /**
     * The variant of the button group, which determines the style of the buttons.
     * If not provided, the buttons will use their assigned variants.
     */
    variant?: Variant;
    /**
     * The size of the buttons in the group, which can be a predefined size or a custom size in pixels.
     * If not provided, the buttons will use their assigned sizes.
     */
    size?: Size | number;

    /**
     * Indicates whether all buttons in the group should be disabled.
     * If true, all buttons will be disabled.
     * @default false
     */
    disabled?: boolean;

    /**
     * The orientation of the button group, either "horizontal" or "vertical".
     * @default "horizontal"
     */
    orientation?: ButtonGroupOrientation;

    /**
     * The loading state of the button group.
     * If true, all buttons in the group will show a loading indicator and be disabled.
     */
    loading?: boolean;

    /**
     * The separator color for the button group.
     * This can be a predefined color or a custom color.
     * If not provided, the default color will be used.
     *
     * @alpha Not implemented yet
     */
    separatorColor?: Color | ColorLike;

    /**
     * The spacing between buttons in the group, in pixels.
     * If not provided, the default spacing will be used.
     * @default 0
     */
    spacing?: number;

    /**
     * The children of the button group, which should be Button components.
     */
    children: ReactNode;
}
