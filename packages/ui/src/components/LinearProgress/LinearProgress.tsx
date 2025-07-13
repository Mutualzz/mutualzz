import { useTheme } from "../../hooks/useTheme";

import styled from "@styled";
import type { Variant } from "@ui-types";
import { resolveColor } from "@utils/resolveColors";
import {
    resolveLength,
    resolveThickness,
    variantColors,
} from "./LinearProgress.helpers";
import { bounce, scaleInOut, slide, wave } from "./LinearProgress.keyframes";
import type { LinearProgressProps } from "./LinearProgress.types";

const ProgressWrapper = styled("div")<{
    width: string | number;
    height: string | number;
    background: string;
    outlinedColor: string;
    variant: Variant;
}>(({ width, background, outlinedColor, variant }) => ({
    position: "relative",
    width,
    background,
    borderRadius: "0.5rem",
    overflow: "hidden",
    ...(variant === "outlined" && { border: `1px solid ${outlinedColor}` }),
}));

ProgressWrapper.displayName = "ProgressWrapper";

const DeterminateBar = styled("div")<{
    barColor: string;
    value: number;
}>(({ barColor, value }) => ({
    width: `${Math.min(Math.max(value, 0), 100)}%`,
    height: "100%",
    background: barColor,
    transition: "width 0.3s ease",
}));

DeterminateBar.displayName = "DeterminateBar";

const IndeterminateBar = styled("div")<{
    barColor: string;
    animation: LinearProgressProps["animation"];
}>(({ barColor, animation }) => {
    const base: Record<string, any> = {
        height: "100%",
        background: barColor,
        position: "absolute",
    };

    switch (animation) {
        case "bounce":
            return {
                ...base,
                width: "30%",
                animation: `${bounce} 1.5s infinite ease-in-out`,
            };
        case "slide":
            return {
                ...base,
                width: "40%",
                animation: `${slide} 1.5s infinite ease-in-out`,
            };
        case "wave":
            return {
                ...base,
                width: "100%",
                animation: `${wave} 1.5s infinite ease-in-out`,
            };
        case "scale-in-out":
            return {
                ...base,
                width: "100%",
                animation: `${scaleInOut} 1.5s infinite ease-in-out`,
            };
    }
});

IndeterminateBar.displayName = "IndeterminateBar";

/**
 * LinearProgress component for displaying progress.
 * It supports both determinate and indeterminate states.
 * The determinate state shows a progress bar that fills based on a value.
 * The indeterminate state shows an animated bar that indicates ongoing progress.
 * The component can be styled with different thicknesses, lengths, variants, and colors.
 */
const LinearProgress = ({
    thickness = "md",
    length = "md",
    variant = "soft",
    color = "primary",
    animation = "bounce",
    determinate = false,
    value = 0,
}: LinearProgressProps) => {
    const { theme } = useTheme();

    const height = resolveThickness(thickness);
    const width = resolveLength(length);

    const background = variantColors(theme, color)[variant];

    const sharedColor = resolveColor(color, theme);

    return (
        <ProgressWrapper
            width={width}
            height={height}
            background={background}
            outlinedColor={sharedColor}
            variant={variant}
        >
            {determinate ? (
                <DeterminateBar barColor={sharedColor} value={value} />
            ) : (
                <IndeterminateBar
                    barColor={sharedColor}
                    animation={animation}
                />
            )}
        </ProgressWrapper>
    );
};

LinearProgress.displayName = "LinearProgress";

export { LinearProgress };
