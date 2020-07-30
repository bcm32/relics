import {GameState} from "../core/game-state";
import {ThemeContext} from "../layout/theme-context";
import React from "react";

type SettingsProps = {
    gameState: GameState,
    onSave: any,
    onClearSave: any
}

export class Settings extends React.Component<SettingsProps> {
    onToggleTheme(toggleTheme: any) {
        const { gameState } = this.props;
        gameState.settings.darkMode = !gameState.settings.darkMode;
        toggleTheme();
    }
    render() {
        const {onSave, onClearSave} = this.props;

        return (
            <div>
                <div>
                    <button onClick={() => onSave()}>Save</button>
                    <button onClick={() => onClearSave()}>Clear Save</button>
                </div>
                <div>
                    <ThemeContext.Consumer>
                        {({theme, toggleTheme}) => (
                            <button onClick={() => this.onToggleTheme(toggleTheme)}>
                                Toggle Dark Mode
                            </button>
                        )}
                    </ThemeContext.Consumer>
                </div>
                <p>Last Saved at ${this.props.gameState.saveTime ? this.props.gameState.saveTime.toString() : ""}</p>
            </div>
        );
    }
}
