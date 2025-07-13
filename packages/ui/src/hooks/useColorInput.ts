import type { ColorLike } from "@ui-types";
import { formatHex, formatHex8, parse } from "culori";
import { useState } from "react";
import { alpha as alphaUtil, randomHexColor } from "../utils";

/**
 * Checls if the input is a valid hex color.
 */
const isValidHex = (value: string): boolean =>
    /^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(value.trim());

/**
 * Checks if the input is a valid RGB color.
 * RGB format: rgb(r, g, b)
 * where r, g, b are integers between 0 and 255.
 */
const isValidRgb = (value: string): boolean =>
    /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/.test(value.trim());

/**
 * Checks if the input is a valid RGBA color.
 * RGBA format: rgba(r, g, b, a)
 * where r, g, b are integers between 0 and 255,
 * and a is a number between 0 and 1 (inclusive).
 */
const isValidRgba = (value: string): boolean =>
    /^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0|1|0?\.\d+)\s*\)$/.test(
        value.trim(),
    );

/**
 * Checks if the input is a valid HSL color.
 * HSL format: hsl(h, s%, l%)
 * where h is an integer between 0 and 360,
 * s and l are percentages between 0% and 100%.
 */
const isValidHsl = (value: string): boolean =>
    /^hsl\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)$/.test(value.trim());

/**
 * Checks if the input is a valid HSLA color.
 * HSLA format: hsla(h, s%, l%, a)
 * where h is an integer between 0 and 360,
 * s and l are percentages between 0% and 100%,
 * and a is a number between 0 and 1 (inclusive).
 */
const isValidHsla = (value: string): boolean =>
    /^hsla\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*,\s*(0|1|0?\.\d+)\s*\)$/.test(
        value.trim(),
    );

/**
 * Checks if the input is a valid color input.
 * It checks for valid hex, rgb, rgba, hsl, and hsla formats.
 * Returns true if the input is valid, false otherwise.
 */
const isValidColorInput = (value: string): boolean =>
    isValidHex(value) ||
    isValidRgb(value) ||
    isValidRgba(value) ||
    isValidHsl(value) ||
    isValidHsla(value);

/**
 * Custom hook for managing color input.
 * It provides state management for the input value,
 * the parsed color, and validation.
 * It allows for setting the color directly and validating the input.
 * The color can be in hex format or with an alpha channel.
 * The hook returns the input value, color, validation state,
 * and functions to handle input changes, validation, and setting the color directly.
 */
export const useColorInput = <T = ColorLike>(
    alpha = 100,
    initialColor: ColorLike = randomHexColor(),
) => {
    const [inputValue, setInputValue] = useState<string>(initialColor);
    const [color, setColor] = useState<string>(initialColor);
    const [isInvalid, setIsInvalid] = useState<boolean>(false);

    const handleChange = (input: string) => {
        setInputValue(input);
    };

    const validate = () => {
        const trimmed = inputValue.trim();

        if (isValidColorInput(trimmed)) {
            const parsed = parse(trimmed);

            if (parsed) {
                setColor(
                    alpha === 100
                        ? formatHex(parsed)
                        : alphaUtil(parsed, alpha),
                );
                setIsInvalid(false);

                return;
            }
        }

        setIsInvalid(true);
    };

    const setColorDirectly = (color: string) => {
        setInputValue(color);
        const parsed = parse(color);
        if (parsed) {
            setColor(alpha === 100 ? formatHex(parsed) : formatHex8(parsed));
            setIsInvalid(false);
        } else {
            setIsInvalid(true);
        }
    };

    return {
        inputValue: inputValue as T,
        color: color as T,
        isInvalid,
        handleChange,
        validate,
        setColorDirectly,
    };
};
