import * as React from "react";
import { GameState } from "../core/game-state";
import {countAvailableStudents} from "../economy/jobAssignments";

type ResourceProps = {
    gameState: GameState,
}

export class ResourcePanel extends React.Component<ResourceProps> {

    render() {
        const { gameState } = this.props;

        return (
            <div>
                <div className="panel--center-align resources__container">
                    {!!gameState.resourceState.relics &&
                        <div>Relics: {gameState.resourceState.relics.toFixed()}</div>}
                    {gameState.researchState.profiteering &&
                        <div className="money-text">Money: {gameState.resourceState.money.toFixed()}</div>}
                    {!!gameState.resourceState.knowledge &&
                        <div className="knowledge-text">Knowledge: {gameState.resourceState.knowledge.toFixed()}</div>}
                    {!!gameState.resourceState.blood &&
                        <div className="blood-text">Blood: {gameState.resourceState.blood.toFixed()}</div>}
                </div>
                {!!gameState.resourceState.students &&
                    <div className="panel--center-align resources__container">
                        <div>Students: {countAvailableStudents(gameState)}/{gameState.resourceState.students}</div>
                    </div>
                }
            </div>
        );
    }
}
