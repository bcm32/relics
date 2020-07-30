import {ITransaction } from "./ITransaction";
import {GameState} from "../../core/game-state";

export class RelicGenerator implements ITransaction {
    updateClock = true;

    commitTransaction(gameState: GameState, amount: number): GameState {
        if(this.isValidPurchase(gameState, amount)) {
            const currCost = this.getCost(gameState, amount);

            gameState.resourceState.relics -= currCost;
            gameState.resourceState.relicGenerator += amount;
        }
        return gameState;
    }

    isValidPurchase(gameState: GameState, amount: number): boolean {
        const currCost = this.getCost(gameState, amount);

        return gameState.resourceState.relics >= currCost;
    }

    getCost(gameState: GameState, purchaseAmount: number) {
        let sum = 0;
        let theoreticalAmt = gameState.resourceState.relicGenerator || 0;
        for (let i = 0; i < purchaseAmount; i++) {
            sum += 25 + theoreticalAmt * 10;
            theoreticalAmt++;
        }
        return sum;
    }
}
