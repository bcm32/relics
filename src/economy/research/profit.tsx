import {Research} from "../Transaction";
import {GameState} from "../../core/game-state";
import {ACHIEVEMENT_ENTRY_TYPE, addDetailedJournalEntry} from "../../core/journal";
import React from "react";

export class Profit extends Research {
    static updateClock = false;

    static commitTransaction(gameState: GameState, amount: number): GameState {
        if(Profit.isValidPurchase(gameState, amount)) {
            gameState.resourceState.knowledge -= 20;
            gameState.researchState.profiteering = true;
            addDetailedJournalEntry(gameState, {
                entry: "A patron finds your work interesting, and provides a slow but steady drip of funding. Relic speed x 1.5.",
                entryType: ACHIEVEMENT_ENTRY_TYPE
            });
        }
        return gameState;
    }

    static isValidPurchase(gameState: GameState, amount: number): boolean {
        return gameState.resourceState.knowledge >= 20;
    }

    static buildTooltip(gameState: GameState): any {
        return (
            <div className="relics-tooltip">
                <div className="relics-tooltip__description">
                    With your student's help, you know enough now to fund this endeavor.
                    A little embellishment never hurt...
                </div>
                <div className="relics-tooltip__cost">
                    <div className="knowledge-text">Knowledge: 20</div>
                </div>
            </div>
        );
    }

    static isAvailable(gameState: GameState): boolean {
        return gameState.researchState.studentKnowledge && !gameState.researchState.profiteering;
    }

    static title = "Procure Funding";
    static id = "profiteering";
    static className = "money-button";
}