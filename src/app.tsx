import React from 'react';
import './app.scss';
import {CorePanel} from "./core/corePanel";
import {ThemeContext, themes} from "./layout/theme-context";
import {loadSave, newSave, saveGameExists} from "./core/saveService";

type AppProps = {}
type AppState = {
    theme: any,
    toggleTheme: () => {}
}

class App extends React.Component<AppProps, AppState> {
    readonly state: AppState;
    toggleTheme: any;

    constructor(props: any) {
        super(props);
        const darkMode = saveGameExists() && loadSave().settings.darkMode;

        this.toggleTheme = () => {
            this.setState(state => ({
                theme:
                    state.theme === themes.dark
                        ? themes.light
                        : themes.dark,
            }));
        };

        this.state = {
            theme: darkMode ? themes.dark : themes.light,
            toggleTheme: this.toggleTheme,
        };

    }

    render() {
        return (
                <ThemeContext.Provider value={this.state}>
                    <div className={this.state.theme.themeClass}>
                        <CorePanel/>
                    </div>
                </ThemeContext.Provider>
        );
    }
}

export default App;
