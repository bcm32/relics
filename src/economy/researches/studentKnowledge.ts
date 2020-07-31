import {ITransaction } from "../ITransaction";
import {GameState} from "../../core/game-state";

export class StudentKnowledge implements ITransaction {
    updateClock = false;

    commitTransaction(gameState: GameState, amount: number): GameState {
        if(this.isValidPurchase(gameState, amount)) {
            gameState.resourceState.knowledge -= 10;
            gameState.researchState.studentKnowledge = true;
        }
        return gameState;
    }

    isValidPurchase(gameState: GameState, amount: number): boolean {
        return gameState.resourceState.knowledge >= 10;
    }
}
