import {IPurchasable } from "../IPurchaseable";
import {GameState, GeneratorState} from "../../settings/game-state";

export class RelicGenerator implements IPurchasable {
    commitTransaction(gameState: GameState, amount: number): GameState {
        if(this.isValidPurchase(gameState, amount)) {
            const currCost = this.getCost(gameState, amount);

            gameState.currencies.relics -= currCost;
            gameState.generators.relicGenerator += amount;
        }
        return gameState;
    }

    isValidPurchase(gameState: GameState, amount: number): boolean {
        const currCost = this.getCost(gameState, amount);

        return gameState.currencies.relics >= currCost;
    }

    getCost(gameState: GameState, purchaseAmount: number) {
        let sum = 0;
        let theoreticalAmt = gameState.generators.relicGenerator || 0;
        for (let i = 0; i < purchaseAmount; i++) {
            sum += 25 + theoreticalAmt * 10;
            theoreticalAmt++;
        }
        return sum;
    }
}