import React from "react";
import {GENERATORS_PANEL_KEY, SETTINGS_PANEL_KEY} from "../config/constants";

type PanelSelectorProps = {
    onChangePanel: any
}
export class PanelSelector extends React.Component<PanelSelectorProps>{
    render() {
        const {onChangePanel} = this.props;
        return (
            <div>
                <button onClick={() => onChangePanel(GENERATORS_PANEL_KEY)}>The Fields</button>
                <button onClick={() => onChangePanel(SETTINGS_PANEL_KEY)}>Settings</button>
            </div>
        );
    }
}