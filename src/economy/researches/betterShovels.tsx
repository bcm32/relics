import {Transaction } from "../Transaction";
import {GameState} from "../../core/game-state";
import {ACHIEVEMENT_ENTRY_TYPE, addDetailedJournalEntry} from "../../core/journal";
import React from "react";

export class BetterShovels extends Transaction {
    static updateClock = false;

    static commitTransaction(gameState: GameState, amount: number): GameState {
        if(BetterShovels.isValidPurchase(gameState, amount)) {
            gameState.resourceState.money -= 50;
            gameState.researchState.betterShovels = true;
            addDetailedJournalEntry(gameState, {
                entry: "A patron finds your work interesting, and provides a slow but steady drip of funding.",
                entryType: ACHIEVEMENT_ENTRY_TYPE
            });
        }
        return gameState;
    }

    static isValidPurchase(gameState: GameState, amount: number): boolean {
        return gameState.resourceState.money >= 50;
    }

    static buildTooltip(gameState: GameState): any {
        return (
            <div className="relics-tooltip">
            <div className="relics-tooltip__description">
                Inscribe a ward.
        </div>
        <div className="relics-tooltip__cost">
            <div>Relics: 100</div>
        <div className="knowledge-text">Knowledge: 20</div>
        <div className="blood-text">Blood: 1</div>
        </div>
        </div>
    );
    }
    static buildTooltip(gameState: GameState) {
        "Buy the team their very first shovel. It's better than none.\n"
        + "Money: 50"
    }

}
