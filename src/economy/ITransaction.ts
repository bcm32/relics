import {GameState } from "../core/game-state";

export interface ITransaction {
    isValidPurchase(gameState: GameState, amount: number): boolean;
    commitTransaction(gameState: GameState, amount: number): GameState;
    updateClock: boolean
}