import {GameState } from "../core/game-state";

export class Transaction {
    static isValidPurchase = (gameState: GameState, amount: number): boolean => false ;
    static commitTransaction = (gameState: GameState, amount: number): GameState => {return gameState};
    static updateClock: boolean = false;
}
