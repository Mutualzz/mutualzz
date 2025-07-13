import type { Theme } from "@emotion/react";
import type { Color, ColorLike, TypographyColor } from "@ui-types";
import { isThemeColor } from "@utils";
import { isTypographyColor } from "@utils/isThemeColor";
import { resolveColor, resolveTypographyColor } from "@utils/resolveColors";
import { formatHex8, parse } from "culori";

export const resolveDividerColor = (
    theme: Theme,
    color: Color | ColorLike | TypographyColor,
) => {
    const parsedColor = isThemeColor(color)
        ? parse(resolveColor(color, theme))
        : isTypographyColor(color)
          ? parse(resolveTypographyColor(color, theme))
          : parse(color);

    if (!parsedColor) throw new Error("Invalid color");

    return formatHex8(parsedColor);
};

export const resolveDividerVariant = (
    isVertical: boolean,
    lineColor: string,
) => {
    return {
        dashed: {
            ...(isVertical
                ? {
                      width: "1px",
                      backgroundImage: `repeating-linear-gradient(to bottom,${lineColor},${lineColor} 4px,transparent 4px,transparent 8px);`,
                  }
                : {
                      height: "1px",
                      backgroundImage: `repeating-linear-gradient(to right,${lineColor},${lineColor} 4px,transparent 4px,transparent 8px)`,
                  }),
        },
        dotted: {
            ...(isVertical
                ? {
                      width: "1px",
                      backgroundImage: `repeating-linear-gradient(to bottom,${lineColor},${lineColor} 1px,transparent 1px,transparent 4px)`,
                  }
                : {
                      height: "1px",
                      backgroundImage: `repeating-linear-gradient(to right,${lineColor},${lineColor} 1px,transparent 1px,transparent 4px)`,
                  }),
        },
        double: {
            ...(isVertical
                ? {
                      width: "1px",
                      borderLeft: `3px double ${lineColor}`,
                      background: "none",
                      boxSizing: "content-box" as const,
                  }
                : {
                      height: 0,
                      borderTop: `3px double ${lineColor}`,
                      background: "none",
                      boxSizing: "content-box" as const,
                  }),
        },
        solid: {
            ...(isVertical ? { width: "1px" } : { height: "1px" }),
            backgroundColor: lineColor,
        },
    };
};
