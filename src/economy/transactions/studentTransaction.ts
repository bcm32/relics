import {ITransaction } from "../ITransaction";
import {GameState} from "../../core/game-state";

export class StudentTransaction implements ITransaction {
    updateClock = false;

    commitTransaction(gameState: GameState, amount: number): GameState {
        if(this.isValidPurchase(gameState, amount)) {
            const currCost = this.getCost(gameState, amount);

            gameState.resourceState.relics -= currCost;
            gameState.resourceState.students += amount;
        }
        return gameState;
    }

    isValidPurchase(gameState: GameState, amount: number): boolean {
        const currCost = this.getCost(gameState, amount);

        return gameState.resourceState.relics >= currCost;
    }

    getCost(gameState: GameState, purchaseAmount: number) {
        let sum = 0;
        let theoreticalAmt = gameState.resourceState.students || 0;
        for (let i = 0; i < purchaseAmount; i++) {
            sum += 10 + theoreticalAmt * 5;
            theoreticalAmt++;
        }
        return sum;
    }
}
