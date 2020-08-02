import {Research} from "../Transaction";
import {GameState} from "../../core/game-state";
import {ACHIEVEMENT_ENTRY_TYPE, addDetailedJournalEntry} from "../../core/journal";
import React from "react";

export class Banks extends Research {
    static updateClock = false;

    static commitTransaction(gameState: GameState, amount: number): GameState {
        if(Banks.isValidPurchase(gameState, amount)) {
            gameState.resourceState.knowledge -= 20;
            gameState.resourceState.money -= 20;
            gameState.researchState.banksOpen = true;
        }
        addDetailedJournalEntry(gameState, {
            entry: "+50 money cap",
            entryType: ACHIEVEMENT_ENTRY_TYPE
        });
        return gameState;
    }

    static isValidPurchase(gameState: GameState, amount: number): boolean {
        return gameState.resourceState.knowledge >= 20
            && gameState.resourceState.money >= 30;
    }

    static buildTooltip(gameState: GameState): any {
        return (
            <div className="relics-tooltip">
                <div className="relics-tooltip__description">
                    We have a load of money and no way to have more loads of money.
                    <br/>Increase money cap +50 and unlock a way to do it more.
                </div>
                <div className="relics-tooltip__cost">
                    <div className="money-text">Money: 30</div>
                    <div className="knowledge-text">Knowledge: 20</div>
                </div>
            </div>
        );
    }

    static isAvailable(gameState: GameState): boolean {
        return gameState.researchState.tours && !gameState.researchState.banksOpen;
    }

    static title = "Bigger Wallets";
    static id = "banks";
    static className = "money-button";
}