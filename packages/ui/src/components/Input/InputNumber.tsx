import type { Size } from "@ui-types";
import { formatHex8 } from "culori";
import { useRef, type ClipboardEvent, type KeyboardEvent } from "react";
import { useTheme } from "../../hooks/useTheme";
import { Stack } from "../Stack/Stack";
import type { InputNumberProps } from "./Input.types";
import { DecoratorWrapper, InputBase, InputRoot } from "./InputBase";

const sizeMap: Record<Size, { width: number; fontSize: string }> = {
    sm: { width: 12, fontSize: "0.5rem" },
    md: { width: 14, fontSize: "0.6rem" },
    lg: { width: 18, fontSize: "0.75rem" },
} as const;

const SpinnerButtons = ({
    onIncrement,
    onDecrement,
    disabled,
    size = "md",
}: InputNumberProps) => {
    const { theme } = useTheme();
    const { width, fontSize } = sizeMap[typeof size === "number" ? "sm" : size];

    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            height="100%"
            flexShrink={0}
            css={{
                marginInlineStart: 4,
                width,
                borderRadius: 4,
                overflow: "hidden",
            }}
        >
            <button
                type="button"
                onClick={onIncrement}
                disabled={disabled}
                aria-label="Increment"
                css={{
                    all: "unset",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "50%",
                    width: "100%",
                    fontSize,
                    lineHeight: 1,
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    "& svg": { width: 12, height: 12 },
                    "&:hover": {
                        backgroundColor: formatHex8(theme.colors.surface),
                    },
                }}
            >
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="18 15 12 9 6 15" />
                </svg>
            </button>
            <button
                type="button"
                onClick={onDecrement}
                disabled={disabled}
                aria-label="Decrement"
                css={{
                    all: "unset",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "50%",
                    width: "100%",
                    fontSize,
                    lineHeight: 1,
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    "& svg": { width: 12, height: 12 },
                    "&:hover": {
                        backgroundColor: formatHex8(theme.colors.surface),
                    },
                }}
            >
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>
        </Stack>
    );
};

SpinnerButtons.displayName = "SpinnerButtons";

/**
 * InputNumber component for entering numeric values.
 * It includes increment and decrement buttons for adjusting the value.
 * It supports various styles, sizes, and states.
 */
const InputNumber = ({
    color = "neutral",
    textColor = "inherit",
    variant = "outlined",
    size = "md",
    fullWidth = false,
    error = false,
    disabled = false,
    step = 1,
    min = -Infinity,
    max = Infinity,
    onChange,
    onIncrement,
    onDecrement,
    startDecorator,
    endDecorator,
    children,
    ...props
}: InputNumberProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        const { key, ctrlKey, metaKey, currentTarget } = e;
        const cursorPos = currentTarget.selectionStart ?? 0;
        const { value } = currentTarget;

        const allowedModifierKeys = [
            "Backspace",
            "Delete",
            "Tab",
            "Escape",
            "Enter",
            "ArrowLeft",
            "ArrowRight",
            "ArrowUp",
            "ArrowDown",
            "Home",
            "End",
        ];

        const isCtrlOrMetaKey = ctrlKey || metaKey;
        const isDigit = /^\d$/.test(key);
        const isMinus = key === "-";
        const isDot = key === ".";

        if (
            allowedModifierKeys.includes(key) ||
            isDigit ||
            (isCtrlOrMetaKey && key.toLowerCase() === "a") ||
            (isCtrlOrMetaKey && key.toLowerCase() === "c") || // copy
            (isCtrlOrMetaKey && key.toLowerCase() === "v") || // paste
            (isCtrlOrMetaKey && key.toLowerCase() === "x") // cut
        )
            return;

        if (isMinus && cursorPos === 0 && !value.includes("-")) return;

        if (isDot && !value.includes(".")) return;

        e.preventDefault();
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        const pasted = e.clipboardData.getData("text");
        if (!/^-?\d*(\.\d*)?$/.test(pasted.trim())) e.preventDefault();
    };

    const handleStepChange = (direction: "up" | "down") => {
        if (!inputRef.current) return;

        const input = inputRef.current;
        const currentValue = parseFloat(input.value) || 0;
        const delta = direction === "up" ? step : -step;
        const nextValue = Math.min(max, Math.max(min, currentValue + delta));

        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            "value",
        )?.set;

        nativeInputValueSetter?.call(input, String(nextValue));

        const event = new Event("input", { bubbles: true });
        input.dispatchEvent(event);
    };

    return (
        <InputRoot
            color={color}
            textColor={textColor}
            variant={variant}
            size={size as number}
            fullWidth={fullWidth}
            error={error}
            disabled={disabled}
        >
            {startDecorator && (
                <DecoratorWrapper>{startDecorator}</DecoratorWrapper>
            )}

            <InputBase
                ref={inputRef}
                {...props}
                type="number"
                inputMode="decimal"
                onChange={onChange}
                min={min}
                max={max}
                step={step}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
            />

            <DecoratorWrapper>
                {endDecorator ?? (
                    <SpinnerButtons
                        size={size}
                        onIncrement={() => handleStepChange("up")}
                        onDecrement={() => handleStepChange("down")}
                        disabled={disabled}
                    />
                )}
            </DecoratorWrapper>
        </InputRoot>
    );
};

InputNumber.displayName = "InputNumber";

export { InputNumber };
