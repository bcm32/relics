import {Transaction} from "../Transaction";
import {GameState} from "../../core/game-state";
import {addDetailedJournalEntry, BLOOD_ENTRY_TYPE} from "../../core/journal";

export class BloodWard extends Transaction {
    static updateClock = false;

    static commitTransaction(gameState: GameState, amount: number): GameState {
        if(this.isValidPurchase(gameState, amount)) {
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
            <div>
                Wow
            </div>
        );
    }
}
