import React from "react";
import {GameState} from "../core/game-state";
import {labFirstUnlock} from "../core/achievements";

type LabProps = {
    gameState: GameState;
}

export class ResearchLab extends React.Component<LabProps> {
    componentDidMount(): void {
        labFirstUnlock(this.props.gameState);
    }

    render() {
        return (
            <div>
            RESEARCH ONLY
            </div>
        );
    }
}
