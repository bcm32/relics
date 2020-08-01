import { Transaction } from "../Transaction";
import {GameState} from "../../core/game-state";

export class StudentKnowledge extends Transaction {
    static updateClock = false;

    static commitTransaction(gameState: GameState, amount: number): GameState {
        if(StudentKnowledge.isValidPurchase(gameState, amount)) {
            gameState.resourceState.knowledge -= 10;
            gameState.researchState.studentKnowledge = true;
        }
        return gameState;
    }

    static isValidPurchase(gameState: GameState, amount: number): boolean {
        return gameState.resourceState.knowledge >= 10;
    }
}
