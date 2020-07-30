import {GameState} from "../core/game-state";
import {ThemeContext} from "../layout/theme-context";
import React from "react";

type SettingsProps = {
    gameState: GameState,
    onSave: any,
}

export class Settings extends React.Component<SettingsProps> {
    render() {
        const {onSave} = this.props;
        return (
            <div>
                <button onClick={() => onSave()}>Save</button>
                <ThemeContext.Consumer>
                    {({theme, toggleTheme}) => (
                        <button onClick={() => toggleTheme()}>
                            Toggle Dark Mode
                        </button>
                    )}
                </ThemeContext.Consumer>
                <p>Last Saved at ${this.props.gameState.saveTime ? this.props.gameState.saveTime.toString() : ""}</p>
            </div>
        );
    }
}
