import styled from "@styled";
import { useEffect, useRef } from "react";
import { resolveTextareaSize, resolveTextareaStyles } from "./Textarea.helpers";
import { type TextareaProps } from "./Textarea.types";

const TextareaRoot = styled("div")<TextareaProps>(
    ({
        theme,
        color = "neutral",
        textColor = "inherit",
        size = "md",
        variant = "outlined",
        disabled,
    }) => ({
        ...resolveTextareaSize(size),
        ...resolveTextareaStyles(theme, color, textColor)[variant],
        ...(disabled && {
            opacity: 0.5,
        }),

        display: "flex",
        alignItems: "center",
        paddingInline: "0.5em",
        gap: "0.375em",
        borderRadius: 8,
        boxSizing: "border-box",
        minWidth: 0,
        width: "100%",
    }),
);

TextareaRoot.displayName = "TextareaRoot";

const TextareaInput = styled("textarea")<{
    resizable?: boolean;
}>(({ resizable }) => ({
    flex: 1,
    width: "100%",
    minWidth: 0,
    border: "none",
    outline: "none",
    background: "transparent",
    color: "inherit",
    font: "inherit",
    padding: 0,
    lineHeight: 1.5,
    resize: resizable ? "both" : "none",
}));

TextareaInput.displayName = "TextareaInput";

/**
 * Textarea component for entering multi-line text.
 * It supports various styles, sizes, and states.
 * The component can be resizable or fixed height based on the `resizable` prop.
 * It automatically adjusts its height based on the content when `resizable` is false.
 * It can also have a minimum and maximum number of rows defined by `minRows` and `maxRows` props.
 */
const Textarea = ({
    color = "neutral",
    textColor = "inherit",
    variant = "outlined",
    size = "md",
    disabled = false,
    resizable = false,
    minRows = 1,
    maxRows,
    ...props
}: TextareaProps) => {
    const ref = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (resizable) return;
        const el = ref.current;
        if (!el) return;

        const updateHeight = () => {
            const computed = getComputedStyle(el);
            const lineHeight = parseFloat(computed.lineHeight);

            const minHeight = minRows ? `${lineHeight * minRows}px` : undefined;
            const maxHeight = maxRows ? `${lineHeight * maxRows}px` : undefined;

            if (minHeight) el.style.minHeight = minHeight;
            if (maxHeight) el.style.maxHeight = maxHeight;

            el.style.height = "auto";
            el.style.height = `${el.scrollHeight}px`;
        };

        updateHeight();

        el.addEventListener("input", updateHeight);

        const resiveObserver = new ResizeObserver(() => {
            updateHeight();
        });

        resiveObserver.observe(el);

        return () => {
            el.removeEventListener("input", updateHeight);
            resiveObserver.disconnect();
        };
    }, [minRows, maxRows, resizable]);

    return (
        <TextareaRoot
            color={color}
            textColor={textColor}
            variant={variant}
            size={size}
            disabled={disabled}
        >
            <TextareaInput
                {...props}
                ref={ref}
                resizable={resizable}
                disabled={disabled}
                rows={minRows}
            />
        </TextareaRoot>
    );
};

Textarea.displayName = "Textarea";

export { Textarea };
