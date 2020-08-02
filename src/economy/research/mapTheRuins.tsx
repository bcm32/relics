import {Research} from "../Transaction";
import {GameState} from "../../core/game-state";
import React from "react";

export class MapTheRuins extends Research {
    static updateClock = false;

    static commitTransaction(gameState: GameState, amount: number): GameState {
        if(MapTheRuins.isValidPurchase(gameState, amount)) {
            gameState.resourceState.knowledge -= 1;
            gameState.researchState.mapTheGrounds = true;
        }
        return gameState;
    }

    static isValidPurchase(gameState: GameState, amount: number): boolean {
        return gameState.resourceState.knowledge >= 1;
    }

    static buildTooltip(gameState: GameState): any {
        return (
            <div className="relics-tooltip">
                <div className="relics-tooltip__description">
                    These relics seem to be found near a few particular features.
                    <br/>Increases base relic search rate by 1.
                </div>
                <div className="relics-tooltip__cost">
                    <div className="knowledge-text">Knowledge: 1</div>
                </div>
            </div>
        );
    }
    static isAvailable(gameState: GameState): boolean {
        return !gameState.researchState.mapTheGrounds;
    }

    static title = "Map the Ruins";
    static id = "map-ruins";
    static className = "knowledge-button";
}
