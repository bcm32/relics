import {GameState, GeneratorState} from "../settings/game-state";

export interface IPurchasable {
    isValidPurchase(gameState: GameState, amount: number): boolean;
    commitTransaction(gameState: GameState, amount: number): GameState;
    getCost(gameState: GameState, amount: number): number
}
