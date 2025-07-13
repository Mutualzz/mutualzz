import { type Size } from "@ui-types";
import { resolveSize } from "@utils/resolveSize";

const minSize = 10,
    maxSize = 28;

export const baseSizeMap: Record<Size, number> = {
    sm: 16,
    md: 20,
    lg: 24,
};

export const resolveRadioStyles = (size: Size | number) => {
    const sizeVal = resolveSize(size, minSize, maxSize, baseSizeMap);

    return {
        padding: sizeVal * 0.2,
        lineHeight: 0,
        fontSize: sizeVal * 0.8,
    };
};

export {
    resolveIconScaling,
    variantColors,
} from "../Checkbox/Checkbox.helpers";
