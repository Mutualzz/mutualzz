import styled from "@emotion/styled";
import {
    type ChangeEvent,
    Children,
    cloneElement,
    isValidElement,
    useState,
} from "react";
import { type CheckboxGroupProps, type CheckboxProps } from "./Checkbox.types";

const CheckboxGroupWrapper = styled("div")<{ row?: boolean }>`
    display: inline-flex;
    flex-direction: ${({ row }) => (row ? "row" : "column")};
    ${({ row }) =>
        row
            ? "& > * + * { margin-left: 0.5rem; }"
            : "& > * + * { margin-top: 0.5rem; }"};
`;

CheckboxGroupWrapper.displayName = "CheckboxGroupWrapper";

/**
 * CheckboxGroup component that renders a group of checkboxes.
 * It allows for controlled or uncontrolled state management of the checkboxes.
 * The component supports a `name` prop for grouping checkboxes, a `value` prop for controlled state,
 * a `defaultValue` for uncontrolled state, and an `onChange` callback for handling changes.
 * It also supports disabling all checkboxes in the group and arranging them in a row or column layout.
 * The `children` prop should contain Checkbox components or valid React elements
 */
const CheckboxGroup = ({
    name,
    value: controlledValue,
    defaultValue,
    onChange,
    disabled,
    row,
    children,
}: CheckboxGroupProps) => {
    const [internalValue, setInternalValue] = useState(defaultValue ?? "");
    const currentValue = controlledValue ?? internalValue;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.value;
        if (!controlledValue) setInternalValue(newVal);

        onChange?.(e, [...currentValue, newVal]);
    };

    const items = Children.map(children, (child) => {
        if (!isValidElement<CheckboxProps>(child)) return child;
        return cloneElement(child, {
            name,
            disabled: disabled ?? child.props.disabled,
            onChange: handleChange,
            checked: child.props.value === currentValue,
        });
    });

    return <CheckboxGroupWrapper row={row}>{items}</CheckboxGroupWrapper>;
};

CheckboxGroup.displayName = "CheckboxGroup";

export { CheckboxGroup };
