import {GameState, SettingsState} from "../core/game-state";
import {ThemeContext} from "../layout/theme-context";
import React from "react";
import {RelicsButton} from "../shared/relicsButton";
import {exportSave, importSave} from "../core/saveService";
import {PATCH_NOTES_KEY} from "../config/constants";

type SettingsProps = {
    gameState: GameState,
    onSave: any,
    onClearSave: any,
    onImportSave: any,
    onChangePanel: any,
}

type SaveDataState = {
    saveString: string,
    displayExport: boolean
}

export class Settings extends React.Component<SettingsProps, SaveDataState> {
    readonly state: SaveDataState;

    constructor(props: SettingsProps) {
        super(props)
        this.state = {
            saveString: "",
            displayExport: false,
        }
    }

    onToggleTheme(toggleTheme: any) {
        const { gameState } = this.props;
        gameState.settings.darkMode = !gameState.settings.darkMode;
        toggleTheme();
    }

    tryImportSave() {
        const save = importSave();
        this.props.onImportSave(save);
    }

    onExport() {
        this.setState({
            displayExport: true,
            saveString: exportSave(this.props.gameState)
        });
    }

    render() {
        const {onSave, onClearSave} = this.props;

        return (
            <div>
                <div className={"button-container"}>
                    <p>The game saves automatically every 30s.</p>
                    <RelicsButton onClick={() => onSave()}>Save</RelicsButton>
                    <RelicsButton onClick={() => onClearSave()}>Clear Save</RelicsButton>
                    <br/>
                </div>
                <div className={"button-container bottom-border"}>
                    <RelicsButton onClick={() => this.tryImportSave()}>Import</RelicsButton>
                    <RelicsButton onClick={() => this.onExport()}>Export</RelicsButton>
                    <br/><br/>
                    {this.state.displayExport && (
                        <div>
                            Copy and save the text below.
                            <div className="settings__export-text"><textarea className="settings__export-text">{this.state.saveString}</textarea></div>
                        </div>
                    )}
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
                <p>Relics - A game by bearhanded.</p>
                <p><a href="https://github.com/bearhanded/relics">GitHub</a></p>
                <p><RelicsButton onClick={() => this.props.onChangePanel(PATCH_NOTES_KEY)}>Patch Notes</RelicsButton></p>
            </div>
        );
    }
}
