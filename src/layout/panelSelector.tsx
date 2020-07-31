import React from "react";
import {GENERATORS_PANEL_KEY, SETTINGS_PANEL_KEY} from "../config/constants";
import {NavButton} from "./navButton";

type PanelSelectorProps = {
    onChangePanel: any,
    selected: string
}
export class PanelSelector extends React.Component<PanelSelectorProps>{
    render() {
        const {onChangePanel, selected} = this.props;
        return (
            <div className={"nav-panel"}>
                <NavButton selected={selected === GENERATORS_PANEL_KEY}
                           onClick={() => onChangePanel(GENERATORS_PANEL_KEY)}>
                    The Fields
                </NavButton>
                <NavButton selected={selected === SETTINGS_PANEL_KEY}
                           onClick={() => onChangePanel(SETTINGS_PANEL_KEY)}>
                    Settings
                </NavButton>
            </div>
        );
    }
}