import styled from "@styled";

import { variantStyles } from "./Typography.helpers";
import { type TypographyProps } from "./Typography.types";

/**
 * Typography component for displaying text with different styles.
 * It supports various levels, colors, variants, and weights.
 * The component can be used for headings, body text, captions, and more.
 */
const Typography = styled("span")<TypographyProps>(
    ({
        theme,
        level = "body-md",
        color = "#fff",
        variant = "none",
        weight,
    }) => ({
        ...theme.typography.levels[level],
        ...variantStyles(theme, color)[variant],
        fontWeight: weight,
    }),
);

Typography.displayName = "Typography";

export { Typography };
