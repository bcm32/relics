import React from "react";
import {GENERATORS_PANEL_KEY, LAB_KEY, SETTINGS_PANEL_KEY} from "../config/constants";
import {NavButton} from "./navButton";
import {GameState} from "../core/game-state";

type PanelSelectorProps = {
    onChangePanel: any,
    selected: string,
    gameState: GameState
}
export class PanelSelector extends React.Component<PanelSelectorProps>{
    render() {
        const {onChangePanel, selected, gameState} = this.props;
        let name = "Dig Site";
        return (
            <div className={"nav-panel"}>
                <NavButton selected={selected === GENERATORS_PANEL_KEY}
                           onClick={() => onChangePanel(GENERATORS_PANEL_KEY)}>
                    {name}
                </NavButton>
                {(gameState.resourceState.students >= 10 || gameState.achievements.labUnlocked) &&
                    <NavButton selected={selected === LAB_KEY}
                               onClick={() => onChangePanel(LAB_KEY)}>
                        Research Lab
                    </NavButton>
                }

                <NavButton selected={selected === SETTINGS_PANEL_KEY}
                           onClick={() => onChangePanel(SETTINGS_PANEL_KEY)}>
                    Settings
                </NavButton>
            </div>
        );
    }
}
