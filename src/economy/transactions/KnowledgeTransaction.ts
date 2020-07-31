import {ITransaction } from "./ITransaction";
import {GameState} from "../../core/game-state";

export class KnowledgeTransaction implements ITransaction {
    updateClock = false;

    commitTransaction(gameState: GameState, amount: number): GameState {
        if(this.isValidPurchase(gameState, amount)) {
            const currCost = this.getCost(gameState, amount);

            gameState.resourceState.relics -= currCost;
            gameState.resourceState.knowledge += amount;
        }
        return gameState;
    }

    isValidPurchase(gameState: GameState, amount: number): boolean {
        const currCost = this.getCost(gameState, amount);
        return gameState.resourceState.relics >= currCost;
    }

    getCost(gameState: GameState, purchaseAmount: number) {
        return 100 * purchaseAmount;
    }
}
