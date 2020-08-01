import * as React from "react";
import { GameState } from "../core/game-state";
import {countAvailableStudents} from "../economy/jobAssignments";

type ResourceProps = {
    gameState: GameState,
}

type ResourcePanelEntryProps = {
    rate?: number;
    className?: string;
}

export class ResourcePanelEntry extends React.Component<ResourcePanelEntryProps> {
    render() {
        const renderRate = this.props.rate !== undefined && this.props.rate !== 0;
        const rateText = this.props.rate + "/s";
        return (
            <div className="resources__entry">
                <div className={this.props.className}>{this.props.children}</div>
                <div className="resources__rate">{renderRate && rateText}</div>
            </div>
        );
    }
}
export class ResourcePanel extends React.Component<ResourceProps> {
    render() {
        const { gameState } = this.props;

        return (
            <div>
                <div className="panel--center-align resources__container">
                    {!!gameState.resourceState.relics &&
                        <ResourcePanelEntry rate={gameState.resourceState.relicRate}>
                            Relics: {gameState.resourceState.relics.toFixed()}
                        </ResourcePanelEntry>}
                    {gameState.researchState.profiteering &&
                        <ResourcePanelEntry className="money-text" rate={gameState.resourceState.moneyRate}>
                            Money: {gameState.resourceState.money.toFixed()}
                        </ResourcePanelEntry>}
                    {!!gameState.resourceState.knowledge &&
                        <ResourcePanelEntry className="knowledge-text" rate={gameState.resourceState.knowledgeRate}>
                            Knowledge: {gameState.resourceState.knowledge.toFixed()}
                        </ResourcePanelEntry>}
                    {!!gameState.resourceState.blood &&
                        <ResourcePanelEntry className="blood-text">
                            Blood: {gameState.resourceState.blood.toFixed()}
                        </ResourcePanelEntry>}
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
