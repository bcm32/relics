import React from "react";

export const themes = {
    light: {
        themeClass: 'app app--light',
    },
    dark: {
        themeClass: 'app app--dark',
    },
};

export const ThemeContext = React.createContext({
    theme: themes.dark, // default value
    toggleTheme: () => {
    },
});