import { type Color, type ColorLike, type Size, type Variant } from "@ui-types";
import type { ReactNode } from "react";

export interface CircularProgressProps {
    /**
     * The size of the circular progress component.
     * Can be a predefined size or a custom size in pixels.
     * @default "md"
     */
    size?: Size | number;
    /**
     * The color of the circular progress component.
     * Can be a predefined color or a custom color.
     * @default "primary"
     */
    color?: Color | ColorLike;
    /**
     * The variant of the circular progress component.
     * Determines the style of the progress indicator.
     * @default "soft"
     */
    variant?: Variant;
    /**
     * Indicates whether the circular progress is in a determinate state.
     * If true, the progress will be based on the `value` prop.
     * @default false
     */
    determinate?: boolean;
    /**
     * The current value of the progress indicator when in determinate mode.
     * Should be a number between 0 and 100.
     * @default 0
     */
    value?: number;

    /**
     * Optional children to render inside the circular progress component.
     * This can be used to display additional content, such as text or icons.
     * If provided, the circular progress will adjust its size to accommodate the content.
     */
    children?: ReactNode;
}
