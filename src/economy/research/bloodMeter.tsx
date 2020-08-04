import {Research} from "../Transaction";
import {GameState} from "../../core/game-state";
import {ACHIEVEMENT_ENTRY_TYPE, addDetailedJournalEntry, BLOOD_ENTRY_TYPE} from "../../core/journal";
import React from "react";

export class BloodMeter extends Research {
    static updateClock = false;

    static commitTransaction(gameState: GameState, amount: number): GameState {
        if(BloodMeter.isValidPurchase(gameState, amount)) {
            gameState.resourceState.blood -= 20;
            gameState.resourceState.knowledge -= 20;
            gameState.resourceState.relics -= 20
            gameState.researchState.bloodMeter = true;
            addDetailedJournalEntry(gameState, {
                entry: "You mount a meter to measure the pending danger in the Ritual Chamber",
                entryType: BLOOD_ENTRY_TYPE
            });
        }
        return gameState;
    }

    static isValidPurchase(gameState: GameState, amount: number): boolean {
        return gameState.resourceState.blood >= 20 && gameState.resourceState.knowledge >= 20 && gameState.resourceState.relics >= 20;
    }

    static buildTooltip(gameState: GameState): any {
        return (
            <div className="relics-tooltip">
                <div className="relics-tooltip__description">
                    Perhaps we can prepare, or at least gauge the threats in the shadow.
                    <br/>Build an interesting meter for the Ritual Chamber.
                </div>
                <div className="relics-tooltip__cost">
                    <div className="blood-text">Blood: 20</div>
                    <div className="knowledge-text">Knowledge: 20</div>
                    <div>Relics: 20</div>
                </div>
            </div>
        );
    }

    static isAvailable(gameState: GameState): boolean {
        return gameState.researchState.ritualCircle && !gameState.researchState.bloodMeter;
    }

    static title = "Blood Meter";
    static id = "blood-meter";
    static className = "blood-button";
}
