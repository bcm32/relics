import {Research} from "../Transaction";
import {GameState} from "../../core/game-state";
import {ACHIEVEMENT_ENTRY_TYPE, addDetailedJournalEntry} from "../../core/journal";
import React from "react";

export class RitualCircle extends Research {
    static updateClock = false;

    static commitTransaction(gameState: GameState, amount: number): GameState {
        if(RitualCircle.isValidPurchase(gameState, amount)) {
            gameState.resourceState.knowledge -= 50;
            gameState.resourceState.relics -= 250;

            gameState.researchState.ritualCircle = true;
            addDetailedJournalEntry(gameState, {
                entry: "You paint a circle on the ground, interlaced with arcane script. What wonders will you create here?",
                entryType: ACHIEVEMENT_ENTRY_TYPE
            });
        }
        return gameState;
    }

    static isValidPurchase(gameState: GameState, amount: number): boolean {
        return gameState.resourceState.knowledge >= 50
            && gameState.resourceState.relics >= 250;
    }

    static buildTooltip(gameState: GameState): any {
        return (
            <div className="relics-tooltip">
                <div className="relics-tooltip__description">
                    Set aside a location and prepare it for incantations. You must find a way to protect your work.
                    <br/>Unlocks the Ritual Chamber.
                </div>
                <div className="relics-tooltip__cost">
                    <div className="knowledge-text">Knowledge: 50</div>
                    <div>Relics: 250</div>
                </div>
            </div>
        );
    }

    static isAvailable(gameState: GameState): boolean {
        return gameState.researchState.bloodWard && !gameState.researchState.ritualCircle;
    }

    static title = "Ritual Chamber";
    static id = "ritual-chamber";
    static className = "knowledge-button";
}
