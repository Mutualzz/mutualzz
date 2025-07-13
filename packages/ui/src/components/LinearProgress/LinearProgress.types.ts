import { type Color, type ColorLike, type Size, type Variant } from "@ui-types";

export type LinearProgressAnimation =
    | "slide"
    | "wave"
    | "bounce"
    | "scale-in-out";

export interface LinearProgressProps {
    /**
     * The length of the progress bar.
     * Can be a predefined size or a custom value.
     * @default "md"
     */
    length?: Size | number;
    /**
     * The thickness of the progress bar.
     * Can be a predefined size or a custom value.
     * @default "md"
     */
    thickness?: Size | number;
    /**
     * The variant of the progress bar.
     * Can be "plain", "solid", "soft", or "outlined".
     * @default "soft"
     */
    variant?: Variant;
    /**
     * The color of the progress bar.
     * Can be a color name or a color value.
     * @default "primary"
     */
    color?: Color | ColorLike;
    /**
     * The animation type for the indeterminate progress bar.
     * Can be "slide", "wave", "bounce", or "scale-in-out".
     * @default "bounce"
     */
    animation?: LinearProgressAnimation;
    /**
     * Whether the progress bar is determinate or indeterminate.
     * If true, the `value` prop is used to determine the progress.
     * If false, the progress bar will animate indefinitely.
     * @default false
     */
    determinate?: boolean;
    /**
     * The value of the progress bar when determinate.
     * Should be a number between 0 and 100.
     * @default 0
     * @remarks This prop is only used when `determinate` is true.
     */
    value?: number;
}
