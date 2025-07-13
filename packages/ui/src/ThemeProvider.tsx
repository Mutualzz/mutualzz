import {
    ThemeProvider as EmotionThemeProvder,
    type Theme,
} from "@emotion/react";
import type { ThemeMode } from "@ui-types";
import {
    createContext,
    useEffect,
    useMemo,
    useState,
    type PropsWithChildren,
} from "react";
import { themesObj } from "./themes";

export const ThemeContext = createContext({
    theme: themesObj["baseDark"],
    changeTheme: (_theme: string) => {},
    mode: "system",
    changeMode: (_mode: ThemeMode) => {},
});

export const ThemeProvider = ({
    children,
    themes = themesObj,
}: PropsWithChildren & { themes?: Record<string, Theme> }) => {
    const [theme, setTheme] = useState<string | null>(null);
    const [mode, setMode] = useState<"light" | "dark" | "system">("system");
    const [prefersDark, setPrefersDark] = useState<boolean | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (typeof window === "undefined") return;

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const updatePrefersDark = () => {
            const isDark = mediaQuery.matches;
            setPrefersDark(isDark);
            if (mode === "system") {
                setTheme(isDark ? "baseDark" : "baseLight");
            }
        };

        updatePrefersDark(); // initialize on mount
        mediaQuery.addEventListener("change", updatePrefersDark);
        return () =>
            mediaQuery.removeEventListener("change", updatePrefersDark);
    }, [mode]);

    const changeMode = (mode: ThemeMode) => {
        setMode(mode);
        if (mode === "system" && prefersDark !== null)
            setTheme(prefersDark ? "baseDark" : "baseLight");
        else if (mode === "dark") setTheme("baseDark");
        else setTheme("baseLight");
    };

    const changeTheme = (theme: string) => {
        setTheme(theme);
    };

    const finalThemeKey =
        theme ??
        (prefersDark != null
            ? prefersDark
                ? "baseDark"
                : "baseLight"
            : "baseDark");

    const themeObject = themes[finalThemeKey];

    const value = useMemo(
        () => ({
            theme: themeObject,
            changeTheme,
            mode,
            changeMode,
        }),
        [mode, themeObject],
    );

    if (!mounted) return null;

    return (
        <ThemeContext.Provider value={value}>
            <EmotionThemeProvder theme={themeObject}>
                {children}
            </EmotionThemeProvder>
        </ThemeContext.Provider>
    );
};
