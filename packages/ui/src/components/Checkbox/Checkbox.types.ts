import { type Color, type ColorLike, type Size, type Variant } from "@ui-types";
import type { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";

export interface CheckboxProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
    /**
     * The label for the checkbox.
     * It can be a string or a ReactNode.
     */
    label?: ReactNode;
    /**
     * The controlled checked state of the checkbox.
     */
    checked?: boolean;
    /**
     * The default checked state of the checkbox.
     * This is used when the checkbox is uncontrolled.
     * If `checked` is provided, this will be ignored.
     */
    defaultChecked?: boolean;
    /**
     * Disables the checkbox.
     * When true, the checkbox cannot be interacted with.
     */
    disabled?: boolean;

    /**
     * Indicates whether the checkbox is in an indeterminate state.
     * This is typically used for checkboxes that represent a group of items
     * where some, but not all, items are checked.
     */
    indeterminate?: boolean;

    /**
     * The icon to display when the checkbox is checked.
     * If not provided, a default check icon will be used.
     */
    checkedIcon?: ReactNode;
    /**
     * The icon to display when the checkbox is unchecked.
     * If not provided, a default unchecked icon will be used.
     */
    uncheckedIcon?: ReactNode;
    /**
     * The icon to display when the checkbox is in an indeterminate state.
     * If not provided, a default indeterminate icon will be used.
     */
    indeterminateIcon?: ReactNode;

    /**
     * The color of the checkbox, which can be a predefined color or a custom color
     *
     * @default "neutral"
     */
    color?: Color | ColorLike;
    /**
     * The variant of the checkbox, which determines its style.
     *
     * @default "solid"
     */
    variant?: Variant;
    /**
     * The size of the checkbox, which can be a predefined size or a custom size in pixels.
     * @default "md"
     */
    size?: Size | number;

    /**
     * This is the directio of the checkbox label.
     * If true, the label will be displayed on the left side of the checkbox.
     * If false, the label will be displayed on the right side of the checkbox.
     */
    rtl?: boolean;
}

export interface CheckboxGroupProps {
    /**
     * The name of the checkbox group.
     * This is used to group checkboxes together.
     */
    name: string;
    /**
     * The controlled value of the checkbox group.
     * This is an array of strings representing the values of the checked checkboxes.
     */
    value?: string[];
    /**
     * The default value of the checkbox group.
     * This is used when the checkbox group is uncontrolled.
     * If `value` is provided, this will be ignored.
     */
    defaultValue?: string[];
    /**
     * The function to call when the value of the checkbox group changes.
     * It receives the event and the new value as arguments.
     */
    onChange?: (event: ChangeEvent<HTMLInputElement>, value: string[]) => void;
    /**
     * Disables all checkboxes in the group.
     * When true, the checkboxes cannot be interacted with.
     */
    disabled?: boolean;
    /**
     * Makes the checkbox group into a row layout.
     * When true, the checkboxes will be displayed in a row.
     * When false, the checkboxes will be displayed in a column.
     */
    row?: boolean;
    /**
     * Checkbox items to render in the group.
     */
    children: ReactNode;
}
