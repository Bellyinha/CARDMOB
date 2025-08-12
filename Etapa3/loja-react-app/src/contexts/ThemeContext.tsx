import React, { createContext, useContext, useState, ReactNode} from "react";
import { Appearance, ColorSchemeName } from "react-native";

// Definie tema
const lightTheme = {
    colors: {
        background: '#ffffff',
        text: '#333333',
        primary: '#0066cc',
    },
    spacing: (value: number) => value * 8, 
};

const darkTheme = {
    colors: {
        background: '#000000',
        text: '#f0f0f0',
        primary: '#3399ff',
    },
    spacing: (value: number) => value * 8,
};

type Theme = typeof lightTheme 

interface ThemeContextProps {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
    theme: lightTheme,
    toggleTheme: () => {},
})

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const colorScheme = Appearance.getColorScheme();
    const [mode, setMode] = useState<ColorSchemeName>(colorScheme || 'light');

    const toggleTheme = () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    const theme = mode === 'light' ? lightTheme : darkTheme;

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);