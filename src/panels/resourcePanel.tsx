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
            <div className="panel--right-align">
                {gameState.resourceState.students &&
                    <div className="padded-text">Students: {countAvailableStudents(gameState)}/{gameState.resourceState.students}</div>}
                {gameState.resourceState.relics &&
                    <div className="padded-text">Relics: {gameState.resourceState.relics.toFixed()}</div>}
                {gameState.resourceState.knowledge &&
                    <div className="padded-text knowledge-text">Knowledge: {gameState.resourceState.knowledge.toFixed()}</div>}
                {gameState.resourceState.blood &&
                    <div className="padded-text blood-text">Blood: {gameState.resourceState.blood.toFixed()}</div>}
            </div>
        );
    }
}
