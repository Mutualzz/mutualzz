import type {
    Color,
    ColorLike,
    Size,
    TypographyColor,
    Variant,
} from "@ui-types";
import type { InputHTMLAttributes, ReactNode } from "react";

export type InputType =
    | "date"
    | "datetime-local"
    | "email"
    | "month"
    | "number"
    | "password"
    | "search"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";

export interface InputBaseProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
    /**
     * The color of the input element.
     * Can be a predefined color or a custom color.
     * @default "neutral"
     */
    color?: Color | ColorLike;
    /**
     * The text color of the input element.
     * Can be a predefined color or a custom color.
     * If set to "inherit", the input will inherit the text color from its parent.
     * @default "inherit"
     */
    textColor?: TypographyColor | "inherit";
    /**
     * The variant of the input element.
     * Determines the style of the input element.
     * Can be "outlined", "solid", "plain", or "soft".
     * @default "outlined"
     */
    variant?: Variant;
    /**
     * The size of the input element.
     * Can be a predefined size ("sm", "md", "lg") or a custom size in pixels.
     * If a number is provided, it will be used as the font size.
     * @default "md"
     */
    size?: Size | number;

    /**
     * Optional start decorator to render before the input element.
     * This can be used to display icons or additional content.
     */
    startDecorator?: ReactNode;
    /**
     * Optional end decorator to render after the input element.
     * This can be used to display icons or additional content.
     */
    endDecorator?: ReactNode;

    /**
     * If true, the input will take the full width of its container.
     * @default false
     */
    fullWidth?: boolean;
    /**
     * If true, the input will be displayed in an error state.
     * This can be used to indicate validation errors or issues with the input.
     * @default false
     */
    error?: boolean;

    /**
     * The type of the input element.
     * Determines the input behavior and validation.
     * Can be one of the following: "date", "datetime-local", "email",
     * "month", "number", "password", "search", "tel", "text",
     * "time", "url", or "week".
     * @default "text"
     */
    type?: InputType;
}

export interface InputPasswordProps extends Omit<InputBaseProps, "type"> {
    /**
     * The type of the input element.
     * Should always be "password" for password inputs.
     * @default "password"
     */
    type?: "password";

    /**
     * If true the password will be visible.
     * If false, the password will be hidden.
     * @default false
     */
    visible?: boolean;
    /**
     * If true, the toggle password visibility icon will be shown.
     * If false, the icon will not be displayed.
     * @default true
     */
    iconVisible?: boolean;

    /**
     * Optional icon to show when the password is visible.
     * This icon will be displayed when the password is in plain text.
     */
    showPasswordIcon?: ReactNode;
    /**
     * Optional icon to show when the password is hidden.
     * This icon will be displayed when the password is obscured.
     */
    hidePasswordIcon?: ReactNode;

    /**
     * Callback function to be called when the password visibility is toggled.
     * This function can be used to handle custom logic when the visibility changes.
     */
    onTogglePassword?: () => void;
    /**
     * Callback function to be called when the password is shown.
     * This function can be used to handle custom logic when the password is made visible.
     */
    onShowPassword?: () => void;
    /**
     * Callback function to be called when the password is hidden.
     * This function can be used to handle custom logic when the password is obscured.
     */
    onHidePassword?: () => void;
}

export interface InputNumberProps
    extends Omit<InputBaseProps, "type" | "value"> {
    /**
     * The type of the input element.
     * Should always be "number" for number inputs.
     * @default "number"
     */
    type?: "number";

    /**
     * The step value for the number input.
     * Determines the increment or decrement value when using the up/down arrows.
     * If not specified, the default step is 1.
     */
    step?: number;
    /**
     * The minimum value for the number input.
     * If the input value is less than this, it will be considered invalid.
     * If not specified, there is no minimum limit.
     */
    min?: number;
    /**
     * The maximum value for the number input.
     * If the input value exceeds this, it will be considered invalid.
     * If not specified, there is no maximum limit.
     */
    max?: number;

    /**
     * Optional start decorator to render before the input element.
     * This can be used to display icons or additional content.
     */
    value?: string;

    /**
     * Callback function to be called when the value is incremented.
     * This function can be used to handle custom logic when the value increases.
     */
    onIncrement?: () => void;
    /**
     * Callback function to be called when the value is decremented.
     * This function can be used to handle custom logic when the value decreases.
     */
    onDecrement?: () => void;
}
