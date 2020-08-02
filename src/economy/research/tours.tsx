import {Research} from "../Transaction";
import {GameState} from "../../core/game-state";
import {ACHIEVEMENT_ENTRY_TYPE, addDetailedJournalEntry, COMMON_ENTRY_TYPE} from "../../core/journal";
import React from "react";

export class Tours extends Research {
    static updateClock = false;

    static commitTransaction(gameState: GameState, amount: number): GameState {
        if(Tours.isValidPurchase(gameState, amount)) {
            gameState.resourceState.knowledge -= 25;
            gameState.researchState.tours = true;
            addDetailedJournalEntry(gameState, {
                entry: "Wait, people will pay to see this place?",
                entryType: COMMON_ENTRY_TYPE
            });
        }
        return gameState;
    }

    static isValidPurchase(gameState: GameState, amount: number): boolean {
        return gameState.resourceState.knowledge >= 25;
    }

    static buildTooltip(gameState: GameState): any {
        return (
            <div className="relics-tooltip">
                <div className="relics-tooltip__description">
                    You form a committee of students to think very hard about how to make more money.
                </div>
                <div className="relics-tooltip__cost">
                    <div className="knowledge-text">Knowledge: 25</div>
                </div>
            </div>
        );
    }

    static isAvailable(gameState: GameState): boolean {
        return gameState.researchState.betterShovels && !gameState.researchState.tours;
    }

    static title = "More funding";
    static id = "tours";
    static className = "money-button";
}