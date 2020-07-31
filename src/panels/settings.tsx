import {GameState} from "../core/game-state";
import {ThemeContext} from "../layout/theme-context";
import React from "react";
import {RelicsButton} from "../shared/relicsButton";

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
                <div className={"button-container"}>
                    <RelicsButton onClick={() => onSave()}>Save</RelicsButton>
                    <RelicsButton onClick={() => onClearSave()}>Clear Save</RelicsButton>
                </div>
                <div>
                    <ThemeContext.Consumer>
                        {({theme, toggleTheme}) => (
                            <div className={"button-container"}>
                                <RelicsButton onClick={() => this.onToggleTheme(toggleTheme)}>
                                    Toggle Dark Mode
                                </RelicsButton>
                            </div>
                        )}
                    </ThemeContext.Consumer>
                </div>
                <p>Last Saved at ${this.props.gameState.saveTime ? this.props.gameState.saveTime.toString() : ""}</p>
            </div>
        );
    }
}
