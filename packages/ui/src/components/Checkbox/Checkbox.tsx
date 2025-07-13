import styled from "@styled";
import { type Size } from "@ui-types";
import { useEffect, useState, type ChangeEvent, type Ref } from "react";
import {
    resolveCheckboxStyles,
    resolveIconScaling,
    variantColors,
} from "./Checkbox.helpers";
import { type CheckboxProps } from "./Checkbox.types";

const CheckboxWrapper = styled("label")<CheckboxProps>(
    ({ disabled, size = "md" }) => ({
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        cursor: "pointer",
        userSelect: "none",
        transition: "all 0.3s ease",
        ...(disabled && { opacity: 0.5, pointerEvents: "none" }),
        ...resolveCheckboxStyles(size),
    }),
);

CheckboxWrapper.displayName = "CheckboxWrapper";

const HiddenCheckbox = styled("input")({
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    cursor: "pointer",
    margin: 0,
    padding: 0,
    opacity: 0,
});

HiddenCheckbox.displayName = "HiddenCheckbox";

const CheckboxBox = styled("span")<CheckboxProps>(({
    theme,
    color = "neutral",
    variant = "solid",
    checked,
}) => {
    const base = {
        position: "relative" as const,
        width: "1em",
        height: "1em",
        border: "1px solid currentColor",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s ease",
        borderRadius: "4px",
        padding: 0,
    };

    const variantStyle = variantColors(theme, color, checked)[variant];

    return {
        ...base,
        ...variantStyle,

        'input[type="checkbox"]:hover + &': variantColors(theme, color, true)[
            variant
        ],
        'input[type="checkbox"]:active + &': variantColors(theme, color, true)[
            variant
        ],
        'input[type="checkbox"]:focus-visible + &': {
            boxShadow: `0 0 0 3px ${variantColors(theme, color, true).solid.backgroundColor}`,
            outline: "none",
        },
        "&::before": {
            content: '""',
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "0.5em",
            height: "0.5em",
            transform: "translate(-50%, -50%)",
            opacity: checked ? 1 : 0,
            transition: "opacity 0.2s ease",
        },
    };
});

CheckboxBox.displayName = "CheckboxBox";

const CheckboxLabel = styled("span")<{ rtl?: boolean }>(({ rtl }) => ({
    ...(rtl ? { marginRight: "0.5em" } : { marginLeft: "0.5em" }),
}));

CheckboxLabel.displayName = "CheckboxLabel";

const IconWrapper = styled("span")<{ size?: Size | number }>(
    ({ size = "md" }) => ({
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        ...resolveIconScaling(size),
        "& > *": {
            width: "100%",
            height: "100%",
        },
    }),
);

IconWrapper.displayName = "IconWrapper";

/**
 * Checkbox component that renders a styled checkbox input with label support.
 * It supports various properties such as checked state, disabled state, color, variant, size,
 * and custom icons for checked, unchecked, and indeterminate states.
 * The component can be controlled via props or managed internally.
 * It also supports RTL label alignment.
 */
const Checkbox = (
    {
        checked: controlledChecked,
        onChange,
        label,
        disabled,
        color = "neutral",
        variant = "solid",
        size = "md",
        name,
        value,
        uncheckedIcon,
        checkedIcon,
        indeterminate,
        indeterminateIcon,
        rtl,
        ...props
    }: CheckboxProps,
    ref?: Ref<HTMLInputElement>,
) => {
    const [internalChecked, setInternalChecked] = useState(false);
    const isChecked = controlledChecked ?? internalChecked;

    useEffect(() => {
        if (typeof ref === "function") return;
        if (ref && "current" in ref && ref.current) {
            ref.current.indeterminate = !!indeterminate;
        }
    }, [ref, indeterminate]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!controlledChecked) setInternalChecked(e.target.checked);
        onChange?.(e);
    };

    return (
        <CheckboxWrapper disabled={disabled} size={size}>
            <HiddenCheckbox
                type="checkbox"
                name={name}
                value={value}
                checked={isChecked}
                onChange={handleChange}
                disabled={disabled}
                ref={ref}
                {...props}
            />
            {rtl && label && <CheckboxLabel rtl={rtl}>{label}</CheckboxLabel>}
            <CheckboxBox
                role="checkbox"
                aria-checked={isChecked}
                color={color}
                variant={variant}
                checked={isChecked}
                disabled={disabled}
                size={size}
            >
                {indeterminate ? (
                    indeterminateIcon ? (
                        <IconWrapper size={size}>
                            {indeterminateIcon}
                        </IconWrapper>
                    ) : (
                        <IconWrapper size={size}>
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="6" y1="12" x2="18" y2="12" />
                            </svg>
                        </IconWrapper>
                    )
                ) : isChecked ? (
                    checkedIcon ? (
                        <IconWrapper size={size}>{checkedIcon}</IconWrapper>
                    ) : (
                        <IconWrapper size={size}>
                            <svg
                                viewBox="2 2 20 20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polyline points="4 12 10 18 20 6" />
                            </svg>
                        </IconWrapper>
                    )
                ) : uncheckedIcon ? (
                    <IconWrapper size={size}>{uncheckedIcon}</IconWrapper>
                ) : null}
            </CheckboxBox>
            {!rtl && label && <CheckboxLabel rtl={rtl}>{label}</CheckboxLabel>}
        </CheckboxWrapper>
    );
};

Checkbox.displayName = "Checkbox";

export { Checkbox };
