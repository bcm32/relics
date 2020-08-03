import {Research} from "../Transaction";
import {GameState} from "../../core/game-state";
import {ACHIEVEMENT_ENTRY_TYPE, addDetailedJournalEntry} from "../../core/journal";
import React from "react";

export class BetterShovels extends Research {
    static updateClock = false;

    static commitTransaction(gameState: GameState, amount: number): GameState {
        if(BetterShovels.isValidPurchase(gameState, amount)) {
            gameState.resourceState.money -= 25;
            gameState.researchState.betterShovels = true;
            addDetailedJournalEntry(gameState, {
                entry: "+1 Shovel",
                entryType: ACHIEVEMENT_ENTRY_TYPE
            });
        }
        return gameState;
    }

    static isValidPurchase(gameState: GameState, amount: number): boolean {
        return gameState.resourceState.money >= 25;
    }

    static buildTooltip(gameState: GameState): any {
        return (
            <div className="relics-tooltip">
                <div className="relics-tooltip__description">
                    Buy the team their very first shovel. It's better than none.
                    <br/>Student base gathering rate +.5 relics/s
                </div>
                <div className="relics-tooltip__cost">
                    <div className="money-text">Money: 25</div>
                </div>
            </div>
        );
    }

    static isAvailable(gameState: GameState): boolean {
        return gameState.researchState.profiteering && !gameState.researchState.betterShovels;
    }

    static title = "Better Shovels";
    static id = "better-shovels";
    static className = "money-button";
}
