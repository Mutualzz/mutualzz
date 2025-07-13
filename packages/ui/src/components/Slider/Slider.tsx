import styled from "@styled";
import type { Color, ColorLike, Size, Variant } from "@ui-types";
import { darken } from "@utils";
import { formatHex8 } from "culori";
import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type ChangeEvent,
    type MouseEvent,
} from "react";
import {
    resolveSliderLabelSize,
    resolveSliderThumbSize,
    resolveSliderThumbStyles,
    resolveSliderTickSize,
    resolveSliderTrackStyles,
    resolveSliderTrackThickness,
} from "./Slider.helpers";
import type {
    SliderMark,
    SliderOrientation,
    SliderProps,
} from "./Slider.types";

const SliderRoot = styled("div")<{
    orientation: SliderOrientation;
    disabled?: boolean;
}>(({ orientation, disabled }) => ({
    position: "relative",
    display: "inline-block",
    boxSizing: "border-box",
    flexDirection: orientation === "vertical" ? "column" : "row",
    alignItems: "center",
    justifyContent: "center",
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? "not-allowed" : "pointer",
    touchAction: "none",
    userSelect: "none",
    ...(orientation === "horizontal"
        ? {
              width: "100%",
          }
        : {
              height: "100%",
          }),
}));

SliderRoot.displayName = "SliderRoot";

const TrackContainer = styled("div")<{
    orientation: SliderOrientation;
    size: Size | number;
}>(({ orientation, size }) => {
    const trackThickness = resolveSliderTrackThickness(size);

    return {
        position: "relative",
        flexGrow: 1,
        borderRadius: 9999,
        ...(orientation === "horizontal"
            ? { height: trackThickness, width: "100%" }
            : { width: trackThickness, height: "100%" }),
    };
});

TrackContainer.displayName = "TrackContainer";

const TrackSegment = styled("div")<{
    orientation: SliderOrientation;
    start: number;
    end: number;
}>(({ theme, orientation, start, end }) => ({
    background: formatHex8(darken(theme.colors.neutral, 0.25)),
    position: "absolute",
    borderRadius: 9999,
    ...(orientation === "horizontal"
        ? {
              left: `${start}%`,
              width: `${end - start}%`,
              top: 0,
              height: "100%",
          }
        : {
              bottom: `${start}%`,
              height: `${end - start}%`,
              left: 0,
              width: "100%",
          }),
}));

TrackSegment.displayName = "TrackSegment";

const TrackSegmentFilled = styled("div")<{
    color: Color | ColorLike;
    variant: Variant;
    orientation: SliderOrientation;
    start: number;
    end: number;
    hovered: boolean;
}>(({ theme, color, variant, orientation, start, end, hovered }) => ({
    position: "absolute",
    borderRadius: 9999,
    ...(orientation === "horizontal"
        ? {
              left: `${start}%`,
              width: `${end - start}%`,
              top: 0,
              height: "100%",
          }
        : {
              bottom: `${start}%`,
              height: `${end - start}%`,
              left: 0,
              width: "100%",
          }),
    ...resolveSliderTrackStyles(theme, color, hovered)[variant],
}));

TrackSegmentFilled.displayName = "TrackSegmentFilled";

const Tick = styled("div")<{
    orientation: SliderOrientation;
    size: Size | number;
    percent: number;
}>(({ theme, percent, orientation, size }) => {
    const minClamp = 1; // percentage (in % of 100%)
    const maxClamp = 99; // clamp within [0.5%, 99.5%]
    const clampedPercent = Math.min(maxClamp, Math.max(minClamp, percent));
    const shift =
        percent <= minClamp ? "0%" : percent >= maxClamp ? "-100%" : "-50%";

    return {
        position: "absolute",
        backgroundColor: theme.colors.common.white,
        borderRadius: "50%",
        ...resolveSliderTickSize(size),

        ...(orientation === "horizontal"
            ? {
                  left: `${clampedPercent}%`,
                  top: "50%",
                  transform: `translate(${shift}, -50%)`,
              }
            : {
                  bottom: `${clampedPercent}%`,
                  left: "50%",
                  transform: "translate(-50%, 50%)",
              }),
    };
});

Tick.displayName = "Tick";

const Thumb = styled("div")<{
    color: Color | ColorLike;
    variant: Variant;
    size: Size | number;
    percent: number;
    orientation: SliderOrientation;
    hovered: boolean;
}>(
    ({
        theme,
        color,
        variant,
        percent,
        orientation,
        size,
        hovered = false,
    }) => ({
        position: "absolute",
        borderRadius: "50%",
        backgroundClip: "content-box",
        boxSizing: "border-box",
        transform: "translate(-50%, -50%)",
        zIndex: 1,
        ...(orientation === "horizontal"
            ? { left: `${percent}%`, top: "50%" }
            : { top: `${100 - percent}%`, left: "50%" }),
        ...resolveSliderThumbStyles(theme, color, hovered)[variant],
        ...resolveSliderThumbSize(size),
    }),
);

Thumb.displayName = "Thumb";

const ValueLabel = styled("span")<{
    orientation: SliderOrientation;
    percent: number;
    size: Size | number;
}>(({ theme, orientation, percent, size }) => {
    const thumbSize = Number(resolveSliderThumbSize(size).width);
    const labelOffset = thumbSize + 20;
    const fontSize = resolveSliderLabelSize(theme, size);
    const clampPercent = Math.min(Math.max(percent, 0), 100);

    return {
        textOverflow: "ellipsis",
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transform:
            orientation === "horizontal"
                ? "translate(-50%, 0)"
                : "translate(-150%, 50%)",
        left: orientation === "horizontal" ? `${clampPercent}%` : 0,
        top: orientation === "horizontal" ? `-${labelOffset}px` : undefined,
        bottom: orientation === "vertical" ? `${clampPercent}%` : undefined,
        fontSize,
        color: theme.typography.colors.primary,
        backgroundColor: theme.colors.neutral,
        padding: "2px 6px",
        borderRadius: 4,
        whiteSpace: "nowrap",
        zIndex: 2,
        pointerEvents: "none",
        userSelect: "none",

        "::after": {
            content: '""',
            position: "absolute",
            width: 0,
            height: 0,
            ...(orientation === "horizontal"
                ? {
                      top: "100%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      borderLeft: "5px solid transparent",
                      borderRight: "5px solid transparent",
                      borderTop: `5px solid ${theme.colors.neutral}`,
                  }
                : {
                      top: "50%",
                      right: 0,
                      transform: "translate(100%, -50%)",
                      borderTop: "5px solid transparent",
                      borderBottom: "5px solid transparent",
                      borderLeft: `5px solid ${theme.colors.neutral}`,
                  }),
        },
    };
});

ValueLabel.displayName = "ValueLabel";

const MarkLabel = styled("span")<{
    orientation: SliderOrientation;
    percent: number;
    size: Size | number;
}>(({ theme, orientation, percent, size }) => ({
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    left: orientation === "horizontal" ? `${percent}%` : "100%",
    top: orientation === "vertical" ? `${100 - percent}%` : undefined,
    transform:
        orientation === "horizontal"
            ? "translate(-50%, 0.75rem)"
            : "translate(0.75rem, -50%)",
    color: theme.typography.colors.accent,
    whiteSpace: "nowrap",
    fontSize: resolveSliderLabelSize(theme, size),
    backgroundColor: "transparent",
    pointerEvents: "none",
    userSelect: "none",
}));

MarkLabel.displayName = "MarkLabel";

const HiddenInput = styled("input")({
    position: "absolute",
    width: 0,
    height: 0,
    opacity: 0,
    margin: 0,
    padding: 0,
    pointerEvents: "none",
});

HiddenInput.displayName = "HiddenInput";

/**
 * Slider component for selecting a value within a range.
 * It supports both single and range selection.
 * It can be oriented horizontally or vertically.
 * It supports marks, value labels, and various styles.
 * The slider can be customized with different colors, variants, and sizes.
 * The component handles mouse and touch events for dragging the thumb.
 * It also supports controlled and uncontrolled states.
 * The `onChange` and `onChangeCommitted` callbacks are triggered during interaction.
 * The `disabled` prop can be used to disable the slider.
 * The `marks` prop can be used to display ticks at specific values.
 * The `valueLabelDisplay` prop controls when the value label is shown.
 * The `valueLabelFormat` prop can be used to format the value label text.
 */
const Slider = ({
    color = "primary",
    variant = "solid",
    size = "md",
    min = 0,
    max = 100,
    step = null,
    defaultValue,
    value,
    onChange,
    onChangeCommitted,
    orientation = "horizontal",
    disabled,
    marks,
    valueLabelDisplay = "off",
    valueLabelFormat,
    getAriaLabel,
    getAriaValueText,
    disableSwap,
    ...rest
}: SliderProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const isRange = Array.isArray(value ?? defaultValue);
    const [internalValue, setInternalValue] = useState<number[]>(
        isRange
            ? ((defaultValue as number[] | undefined) ?? [min, max])
            : [(defaultValue as number | undefined) ?? min],
    );
    const isControlled = value !== undefined;
    const currentValue = isControlled
        ? Array.isArray(value)
            ? value
            : [value]
        : internalValue;

    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const percents = currentValue.map((v) => ((v - min) / (max - min)) * 100);
    const sortedPercents = [...percents].sort((a, b) => a - b);

    const resolvedMarks: SliderMark[] = useMemo(() => {
        if (marks === true) {
            const s = step ?? 1;
            const out: SliderMark[] = [];
            for (let i = min; i <= max; i += s) {
                out.push({ value: i });
            }
            return out;
        } else if (Array.isArray(marks)) {
            const seen = new Set<number>();
            return marks.filter((mark) => {
                if (seen.has(mark.value)) return false;
                seen.add(mark.value);
                return true;
            });
        }
        return [];
    }, [marks, min, max, step]);

    const snapToMarks = useCallback(
        (val: number) => {
            if (!Array.isArray(marks)) return val;

            const sorted = [min, max, ...marks.map((m) => m.value)]
                .filter((v, i, a) => a.indexOf(v) === i) // deduplicate
                .sort((a, b) => a - b);

            return sorted.reduce(
                (closest, curr) =>
                    Math.abs(curr - val) < Math.abs(closest - val)
                        ? curr
                        : closest,
                sorted[0],
            );
        },
        [marks],
    );

    const updateValue = useCallback(
        (index: number, newVal: number) => {
            if (disabled) return;
            if (newVal < min) newVal = min;
            if (newVal > max) newVal = max;
            if (step === null) newVal = snapToMarks(newVal);

            if (isRange && disableSwap) {
                if (index === 0 && newVal > currentValue[1]) return;
                if (index === 1 && newVal < currentValue[0]) return;
            }

            const newValue: number[] = [...currentValue];
            newValue[index] = newVal;
            if (!isControlled) setInternalValue(newValue);
            const fakeEvent = {
                target: { value: isRange ? newValue : newValue[0] },
            } as unknown as ChangeEvent<HTMLInputElement>;
            onChange?.(fakeEvent, isRange ? newValue : newValue[0]);
        },
        [
            currentValue,
            isControlled,
            isRange,
            snapToMarks,
            onChange,
            disableSwap,
        ],
    );

    const getPositionValue = useCallback(
        (clientX: number, clientY: number) => {
            if (!ref.current) return null;
            const rect = ref.current.getBoundingClientRect();
            const pos =
                orientation === "horizontal"
                    ? clientX - rect.left
                    : rect.bottom - clientY;
            const size =
                orientation === "horizontal" ? rect.width : rect.height;
            const percent = Math.min(Math.max(pos / size, 0), 1);
            const raw = percent * (max - min) + min;
            const stepped =
                step == null ? Math.round(raw) : Math.round(raw / step) * step;

            return Math.min(Math.max(stepped, min), max);
        },
        [orientation, min, max, step],
    );

    useEffect(() => {
        const handleMove = (e: MouseEvent | TouchEvent) => {
            if (draggingIndex === null) return;
            const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
            const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
            const newValue = getPositionValue(clientX, clientY);
            if (newValue !== null) updateValue(draggingIndex, newValue);
        };

        const handleUp = (e: MouseEvent | TouchEvent) => {
            if (draggingIndex !== null) {
                setDraggingIndex(null);
                onChangeCommitted?.(
                    e as any,
                    isRange ? [...currentValue] : currentValue[0],
                );
            }
            window.removeEventListener("mousemove", handleMove as any);
            window.removeEventListener("mouseup", handleUp as any);
            window.removeEventListener("touchmove", handleMove);
            window.removeEventListener("touchend", handleUp);
        };

        if (draggingIndex !== null) {
            window.addEventListener("mousemove", handleMove as any);
            window.addEventListener("mouseup", handleUp as any);
            window.addEventListener("touchmove", handleMove);
            window.addEventListener("touchend", handleUp);
        }

        return () => {
            window.removeEventListener("mousemove", handleMove as any);
            window.removeEventListener("mouseup", handleUp as any);
            window.removeEventListener("touchmove", handleMove);
            window.removeEventListener("touchend", handleUp);
        };
    }, [
        draggingIndex,
        currentValue,
        updateValue,
        getPositionValue,
        onChangeCommitted,
        isRange,
    ]);

    const handleTrackStart = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
        const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
        const clickedVal = getPositionValue(clientX, clientY);
        if (clickedVal === null) return;

        let indexToDrag = 0;

        if (isRange) {
            const dist = currentValue.map((v) => Math.abs(v - clickedVal));
            indexToDrag = dist[0] <= dist[1] ? 0 : 1;

            // 🔁 Update value immediately when clicking on the track
            updateValue(indexToDrag, clickedVal);
        } else {
            updateValue(0, clickedVal);
        }

        setDraggingIndex(indexToDrag);
    };

    return (
        <SliderRoot
            ref={ref}
            disabled={disabled}
            orientation={orientation}
            onMouseDown={handleTrackStart}
            onTouchStart={handleTrackStart as any}
        >
            <TrackContainer orientation={orientation} size={size}>
                {isRange ? (
                    <>
                        <TrackSegmentFilled
                            color={color}
                            variant={variant}
                            start={0}
                            end={sortedPercents[0]}
                            orientation={orientation}
                            hovered={hoveredIndex === 0}
                        />
                        <TrackSegment
                            start={sortedPercents[0]}
                            end={sortedPercents[1]}
                            orientation={orientation}
                        />
                        <TrackSegmentFilled
                            color={color}
                            variant={variant}
                            start={sortedPercents[1]}
                            end={100}
                            orientation={orientation}
                            hovered={hoveredIndex === 1}
                        />
                    </>
                ) : (
                    <>
                        <TrackSegmentFilled
                            color={color}
                            variant={variant}
                            start={0}
                            end={sortedPercents[0]}
                            orientation={orientation}
                            hovered={hoveredIndex === 0}
                        />
                        <TrackSegment
                            start={sortedPercents[0]}
                            end={100}
                            orientation={orientation}
                        />
                    </>
                )}

                {resolvedMarks.map((mark, i) => {
                    const percent = ((mark.value - min) / (max - min)) * 100;
                    return (
                        <>
                            <Tick
                                key={`tick-${i}`}
                                orientation={orientation}
                                percent={percent}
                                size={size}
                            />
                            {marks !== true && (
                                <MarkLabel
                                    percent={percent}
                                    orientation={orientation}
                                    key={`markLabel-${i}`}
                                    size={size}
                                >
                                    {mark.label ?? mark.value}
                                </MarkLabel>
                            )}
                        </>
                    );
                })}

                {currentValue.map((val, i) => (
                    <>
                        <Thumb
                            color={color}
                            variant={variant}
                            size={size}
                            key={i}
                            percent={percents[i]}
                            hovered={hoveredIndex === i}
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            orientation={orientation}
                            onMouseDown={(e) => {
                                e.stopPropagation();
                                setDraggingIndex(i);
                            }}
                            onTouchStart={(e) => {
                                e.stopPropagation();
                                setDraggingIndex(i);
                            }}
                        />
                        {(valueLabelDisplay === "on" ||
                            (valueLabelDisplay === "auto" &&
                                (draggingIndex === i ||
                                    hoveredIndex === i))) && (
                            <ValueLabel
                                orientation={orientation}
                                percent={percents[i]}
                                size={size}
                            >
                                {(() => {
                                    if (valueLabelFormat) {
                                        if (
                                            typeof valueLabelFormat ===
                                            "function"
                                        )
                                            return valueLabelFormat(val, i);
                                        else
                                            return valueLabelFormat
                                                .replace(
                                                    "{value}",
                                                    val.toString(),
                                                )
                                                .replace(
                                                    "{index}",
                                                    i.toString(),
                                                );
                                    }

                                    if (getAriaValueText)
                                        return getAriaValueText(val, i);

                                    if (getAriaLabel) return getAriaLabel(i);

                                    return typeof val === "number"
                                        ? val.toFixed(0)
                                        : val;
                                })()}
                            </ValueLabel>
                        )}
                    </>
                ))}
            </TrackContainer>
            <HiddenInput
                type="range"
                min={min}
                max={max}
                step={step ?? 1}
                value={isRange ? undefined : currentValue[0]}
                onChange={(e: any) => {
                    const newVal = parseFloat(e.target.value);
                    updateValue(0, newVal);
                }}
                disabled={disabled}
                {...rest}
            />
        </SliderRoot>
    );
};

Slider.displayName = "Slider";

export { Slider };
