import * as React from "react";
import { GameState } from "../core/game-state";
import {RelicGenerator} from "../economy/transactions/relicGenerator";
import {countAvailableStudents} from "../economy/jobAssignments";

type AchievementProps = {
    gameState: GameState,
}

export class AchievementPanel extends React.Component<AchievementProps> {

    render() {
        const { achievements } = this.props.gameState;
        return (
            <div className="core-panel__center-column">
                <div className="achievements__row">
                    <div className="achievements__entry">
                        I
                    </div>
                </div>
            </div>
        );
    }
}
