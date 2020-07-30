import * as React from "react";
import { GameState } from "../core/game-state";
import {RelicGenerator} from "../economy/transactions/relicGenerator";
import {countAvailableStudents} from "../economy/jobAssignments";

type ResourceProps = {
    gameState: GameState,
}

export class ResourcePanel extends React.Component<ResourceProps> {

    render() {
        const { gameState } = this.props;
        return (
            <div>
                <div>Students: {countAvailableStudents(gameState)}/{gameState.resourceState.students}</div>
                <div>Relics: {gameState.resourceState.relics.toFixed()}</div>
            </div>
        );
    }
}
