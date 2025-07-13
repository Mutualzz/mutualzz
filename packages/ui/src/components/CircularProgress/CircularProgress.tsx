import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../hooks/useTheme";

import { resolveColor } from "@utils/resolveColors";
import {
    resolveCircularProgressSizes,
    resolveCiruclarProgressThickness,
    variantColors,
} from "./CircularProgress.helpers";
import { spin } from "./CircularProgress.keyframes";
import type { CircularProgressProps } from "./CircularProgress.types";

/**
 * CircularProgress component that renders a circular progress indicator.
 * It supports both determinate and indeterminate states, with customizable size, variant, and color.
 * The component can display children content inside the circular progress.
 * It uses SVG for rendering the progress circle and applies styles based on the provided props.
 */
const CircularProgress = ({
    size = "md",
    variant = "soft",
    color = "primary",
    determinate = false,
    value = 0,
    children,
    ...props
}: CircularProgressProps) => {
    const { theme } = useTheme();
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentDiameter, setContentDiameter] = useState(0);

    useEffect(() => {
        if (!contentRef.current) return;
        const ro = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            setContentDiameter(Math.max(width, height));
        });
        ro.observe(contentRef.current);
        return () => ro.disconnect();
    }, []);

    const contentPadding = 8;

    const strokeWidth = resolveCiruclarProgressThickness(size);

    const diameter = contentDiameter
        ? contentDiameter + strokeWidth + contentPadding * 2
        : resolveCircularProgressSizes(size);

    const radius = (diameter - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = ((100 - value) / 100) * circumference;

    const outerStroke = variantColors(theme, color)[variant];
    const innerStroke = resolveColor(color, theme);
    const outlinedStroke = resolveColor(color, theme);

    return (
        <div
            css={{
                position: "relative",
                display: "inline-flex",
                width: diameter,
                height: diameter,
                justifyContent: "center",
                alignItems: "center",
                padding: 0,

                ...(variant === "outlined" && diameter > 0
                    ? {
                          "::before": {
                              content: '""',
                              position: "absolute",
                              top: strokeWidth / 2,
                              left: strokeWidth / 2,
                              right: strokeWidth / 2,
                              bottom: strokeWidth / 2,
                              borderRadius: "50%",
                              border: `1px solid ${outlinedStroke}`,
                              boxSizing: "border-box",
                          },
                          "::after": {
                              content: '""',
                              position: "absolute",
                              top: -1,
                              left: -1,
                              right: -1,
                              bottom: -1,
                              borderRadius: "50%",
                              border: `1px solid ${outlinedStroke}`,
                              boxSizing: "border-box",
                          },
                      }
                    : {}),
            }}
        >
            <div
                css={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxSizing: "border-box",
                    padding: 8,
                }}
                ref={contentRef}
            >
                {children}
            </div>

            {diameter > 0 && (
                <svg
                    {...props}
                    width={diameter}
                    height={diameter}
                    viewBox={`0 0 ${diameter} ${diameter}`}
                    css={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        animation: !determinate
                            ? `${spin} 1s linear infinite`
                            : undefined,
                    }}
                >
                    <circle
                        cx={diameter / 2}
                        cy={diameter / 2}
                        r={radius}
                        stroke={
                            variant === "outlined" ? "transparent" : outerStroke
                        }
                        strokeWidth={strokeWidth}
                        fill="none"
                    />
                    <circle
                        cx={diameter / 2}
                        cy={diameter / 2}
                        r={radius}
                        stroke={innerStroke}
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeDasharray={
                            determinate
                                ? circumference
                                : `${circumference * 0.25} ${circumference}`
                        }
                        strokeDashoffset={determinate ? dashOffset : 0}
                        strokeLinecap="round"
                        css={{
                            transform: "rotate(-90deg)",
                            transformOrigin: "center",
                            transition:
                                "stroke-dasharray 0.3s ease, stroke-dashoffset 0.3s ease, transform 0.3s ease",
                        }}
                    />
                </svg>
            )}
        </div>
    );
};

CircularProgress.displayName = "CircularProgress";

export { CircularProgress };
