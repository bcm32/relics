import {Research} from "../Transaction";
import {GameState} from "../../core/game-state";
import {ACHIEVEMENT_ENTRY_TYPE, addDetailedJournalEntry} from "../../core/journal";
import React from "react";

export class SearchAlgorithms extends Research {
    static updateClock = false;

    static commitTransaction(gameState: GameState, amount: number): GameState {
        if(SearchAlgorithms.isValidPurchase(gameState, amount)) {
            gameState.resourceState.money -= 25;
            gameState.researchState.searchAlgorithms = true;
            addDetailedJournalEntry(gameState, {
                entry: "The students look like idiots out there, but the results don't lie. +0.5 base relics/s",
                entryType: ACHIEVEMENT_ENTRY_TYPE
            });
        }
        return gameState;
    }

    static isValidPurchase(gameState: GameState, amount: number): boolean {
        return gameState.resourceState.knowledge >= 30 && gameState.resourceState.relics >= 200;
    }

    static buildTooltip(gameState: GameState): any {
        return (
            <div className="relics-tooltip">
                <div className="relics-tooltip__description">
                    Teach the students how to search more efficiently. It works for you but it might just be confirmation bias.
                    <br/>Student base gathering rate +0.5 relics/s
                </div>
                <div className="relics-tooltip__cost">
                    <div className="knowledge-text">Knowledge: 30</div>
                    <div>Relics: 200</div>
                </div>
            </div>
        );
    }

    static isAvailable(gameState: GameState): boolean {
        return gameState.researchState.betterShovels && !gameState.researchState.searchAlgorithms;
    }

    static title = "Search Algorithms";
    static id = "search-algorithms";
    static className = "knowledge-button";
}
