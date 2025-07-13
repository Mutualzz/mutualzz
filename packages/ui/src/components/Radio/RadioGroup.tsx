import styled from "@emotion/styled";
import {
    type ChangeEvent,
    Children,
    cloneElement,
    isValidElement,
    useState,
} from "react";
import { type RadioGroupProps, type RadioProps } from "./Radio.types";

const RadioGroupButtonWrapper = styled("div")<{ row?: boolean }>`
    display: inline-flex;
    flex-direction: ${({ row }) => (row ? "row" : "column")};
    ${({ row }) =>
        row
            ? "& > * + * { margin-left: 0.5rem; }"
            : "& > * + * { margin-top: 0.5rem; }"};
`;

RadioGroupButtonWrapper.displayName = "RadioGroupButtonWrapper";

/**
 * RadioGroup component for grouping radio buttons.
 * It allows for selecting one option from a set of radio buttons.
 * The component can be controlled or uncontrolled.
 * It supports different layouts (row or column) and can handle disabled states.
 * The `onChange` event handler is called when the selected radio button changes.
 * The `name` prop is used to group radio inputs, and the `value` prop
 * is used to set the selected value.
 * The `defaultValue` prop can be used to set the initial selected value.
 * The `children` prop allows for passing in radio button components.
 */
const RadioGroup = ({
    name,
    value: controlledValue,
    defaultValue,
    onChange,
    disabled,
    row,
    children,
}: RadioGroupProps) => {
    const [internalValue, setInternalValue] = useState(defaultValue ?? "");
    const currentValue = controlledValue ?? internalValue;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.value;
        if (!controlledValue) setInternalValue(newVal);

        onChange?.(e, newVal);
    };

    const items = Children.map(children, (child) => {
        if (!isValidElement<RadioProps>(child)) return child;
        return cloneElement(child, {
            name,
            disabled: disabled ?? child.props.disabled,
            onChange: handleChange,
            checked: child.props.value === currentValue,
        });
    });

    return <RadioGroupButtonWrapper row={row}>{items}</RadioGroupButtonWrapper>;
};

RadioGroup.displayName = "RadioGroup";

export { RadioGroup };
