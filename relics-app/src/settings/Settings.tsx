import * as React from "react";
import {GameState} from "../core/game-state";
import {saveGame} from "../core/saveService";

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
                <p>Last Saved at ${this.props.gameState.saveTime ? this.props.gameState.saveTime.toString() : ""}</p>
            </div>
        );
    }
}
