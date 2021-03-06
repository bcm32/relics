import * as React from "react";
import { GameState } from "../core/game-state";
import {countAvailableStudents} from "../economy/jobAssignments";
import {formatRateNumber} from "../shared/formatNumbers";

type ResourceProps = {
    gameState: GameState,
}

type ResourcePanelEntryProps = {
    rate?: number;
    cap?: number;
    className?: string;
}

export class ResourcePanelEntry extends React.Component<ResourcePanelEntryProps> {
    render() {
        let rateText = "";
        const renderRate = this.props.rate !== undefined && this.props.rate !== 0;
        if(this.props.rate !== undefined) rateText = formatRateNumber(this.props.rate) + "/s"; // ts has a conniption without the IF
        const renderCap = this.props.cap !== undefined && this.props.cap !== 0;

        return (
            <div className="resources__entry">
                <div className={this.props.className}>
                    {this.props.children}
                    {renderCap && (
                        <span className="resources__rate">/{this.props.cap}</span>
                    )}
                </div>
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
                        <ResourcePanelEntry rate={gameState.resourceState.relicRate}
                                            cap={gameState.resourceState.relicCap}>
                            Relics: {gameState.resourceState.relics.toFixed()}
                        </ResourcePanelEntry>}
                    {gameState.researchState.profiteering &&
                        <ResourcePanelEntry className="money-text" rate={gameState.resourceState.moneyRate}
                                            cap={gameState.resourceState.moneyCap}>
                            Money: {gameState.resourceState.money.toFixed()}
                        </ResourcePanelEntry>}
                    {gameState.achievements.labUnlocked &&
                        <ResourcePanelEntry className="knowledge-text" rate={gameState.resourceState.knowledgeRate}
                                            cap={gameState.resourceState.knowledgeCap}>
                            Knowledge: {gameState.resourceState.knowledge.toFixed()}
                        </ResourcePanelEntry>}
                    {(!!gameState.resourceState.blood || gameState.researchState.bloodWard) &&
                    <ResourcePanelEntry className="blood-text" rate={gameState.resourceState.bloodRate}>
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

