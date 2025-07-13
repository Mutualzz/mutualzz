import type { Size } from "@ui-types";

export const resolveSize = (
    size: Size | number,
    minSize: number,
    maxSize: number,
    map: Record<Size, number>,
) => {
    let final: number;
    if (typeof size === "number") final = size;
    else if (size in map) final = map[size];
    else {
        const parsed = parseFloat(size);
        final = isNaN(parsed) ? map.md : parsed;
    }

    final = Math.max(minSize, Math.min(maxSize, final));

    return final;
};
