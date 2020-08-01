import React from "react";
import {Research} from "../Transaction";
import {GameState} from "../../core/game-state";
import {addDetailedJournalEntry, BLOOD_ENTRY_TYPE} from "../../core/journal";

export class BloodWard extends Research {
    static updateClock = false;

    static commitTransaction(gameState: GameState, amount: number): GameState {
        if(BloodWard.isValidPurchase(gameState, amount)) {
            gameState.resourceState.relics -= 100;
            gameState.resourceState.blood -= 1;
            gameState.resourceState.knowledge -= 20;

            gameState.researchState.bloodWard = true;
            addDetailedJournalEntry(gameState, {
                entry: "Following instructions on the ruins, you assemble a ward. That should protect this place.",
                entryType: BLOOD_ENTRY_TYPE
            });
        }
        return gameState;
    }

    static isValidPurchase(gameState: GameState, amount: number): boolean {
        return gameState.resourceState.blood >= 1 && gameState.resourceState.knowledge >= 20 && gameState.resourceState.relics >= 100;
    }

    static buildTooltip(gameState: GameState): any {
        return (
            <div className="relics-tooltip">
                <div className="relics-tooltip__description">
                    The excavated ruins are carved with a repeating pattern, and no one has disappeared in there yet.
                </div>
                <div className="relics-tooltip__cost">
                    <div>Relics: 100</div>
                    <div className="knowledge-text">Knowledge: 20</div>
                    <div className="blood-text">Blood: 1</div>
                </div>
            </div>
        );
    }

    static isAvailable(gameState: GameState): boolean {
        return gameState.researchState.profiteering && !gameState.researchState.bloodWard;
    }

    static title = "Inscribe a ward";
    static id = "blood-ward";
    static className = "blood-button";
}