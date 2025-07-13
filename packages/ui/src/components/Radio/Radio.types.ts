import { type Color, type ColorLike, type Size, type Variant } from "@ui-types";
import {
    type ChangeEvent,
    type InputHTMLAttributes,
    type ReactNode,
} from "react";

export interface RadioProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
    /**
     * Whether the radio is checked. If not provided, it will be controlled internally.
     * @default false
     */
    checked?: boolean;
    /**
     * Callback function called when the radio is checked or unchecked.
     * It receives the change event as an argument.
     */
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    /**
     * The label to display next to the radio button.
     * This can be a string or any valid React node.
     */
    label?: ReactNode;
    /**
     * Whether the radio button is disabled.
     * When true, the radio button will be unclickable and visually styled as disabled.
     * @default false
     */
    disabled?: boolean;

    /**
     * The color of the radio button.
     * This can be a predefined color name or a custom color value.
     * @default "primary"
     */
    color?: Color | ColorLike;
    /**
     * The variant of the radio button.
     * This defines the visual style of the radio button.
     * @default "solid"
     */
    variant?: Variant;
    /**
     * The size of the radio button.
     * This can be a predefined size or a custom size value.
     * @default "md"
     */
    size?: Size | number;

    /**
     * Unchecked icon to display when the radio is not checked.
     * This can be any valid React node, such as an SVG icon or an image.
     * If not provided, a default icon will be used.
     */
    uncheckedIcon?: ReactNode;
    /**
     * Checked icon to display when the radio is checked.
     * This can be any valid React node, such as an SVG icon or an image.
     * If not provided, a default icon will be used.
     */
    checkedIcon?: ReactNode;

    /**
     * Whether the radio button label should be displayed in a right-to-left layout.
     * @default false
     */
    rtl?: boolean;
}

export interface RadioGroupProps {
    /**
     * The name of the radio group.
     * This is used to group radio buttons together so that only one can be selected at a time.
     * It is also used to identify the group in form submissions.
     */
    name: string;
    /**
     * The value of the currently selected radio button.
     */
    value?: string;
    /**
     * The default value of the radio group when it is first rendered.
     */
    defaultValue?: string;
    /**
     * Callback function called when the selected radio button changes.
     * It receives the change event and the new value as arguments.
     */
    onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
    /**
     * Whether the radio group is disabled.
     * When true, all radio buttons in the group will be unclickable and visually styled as disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * Whether the radio buttons should be displayed in a row.
     * When true, the radio buttons will be arranged horizontally.
     * @default false
     */
    row?: boolean;

    /**
     * The children of the radio group.
     * This should be a collection of `Radio` components that will be rendered as part of the group.
     * Each `Radio` component should have a unique `value` prop.
     */
    children: ReactNode;
}
