import React from 'react';
import './App.css';
import {CorePanel} from "./core/CorePanel";
import {ThemeContext, themes} from "./layout/theme-context";

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

        this.toggleTheme = () => {
            console.log("TOGGLE")
            this.setState(state => ({
                theme:
                    state.theme === themes.dark
                        ? themes.light
                        : themes.dark,
            }));
        };

        this.state = {
            theme: themes.light,
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
