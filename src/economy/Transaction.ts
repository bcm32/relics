import {GameState } from "../core/game-state";

export class Transaction {
    static isValidPurchase = (gameState: GameState, amount: number): boolean => false ;
    static commitTransaction = (gameState: GameState, amount: number): GameState => {return gameState};
    static updateClock: boolean = false;
}

export class Research extends Transaction {
    static isAvailable = (gameState: GameState): boolean => false;
    static buildTooltip = (gameState: GameState): any => "MISSING TOOLTIP";
    static title: string = "MISSING TITLE";
    static className = "";
    static id = "";
}

export function safeResource(resource: any) {
    return (resource == undefined || resource == null) ? 0 : resource;
}