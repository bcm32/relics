import {safeResource, Transaction} from "../Transaction";
import {GameState} from "../../core/game-state";
import React from "react";

export class BankTransaction extends Transaction{
    updateClock = false;

    static commitTransaction(gameState: GameState, amount: number): GameState {
        if(BankTransaction.isValidPurchase(gameState, amount)) {
            const currCost = BankTransaction.getCost(gameState, amount);

            gameState.resourceState.money -= currCost;
            gameState.resourceState.banks = safeResource(gameState.resourceState.banks) + amount;
        }
        return gameState;
    }

    static isValidPurchase(gameState: GameState, amount: number): boolean {
        const currCost = BankTransaction.getCost(gameState, amount);
        return gameState.resourceState.money >= currCost;
    }

    static getCost(gameState: GameState, purchaseAmount: number) {
        let sum = 0;
        let theoreticalAmt = gameState.resourceState.banks || 0;
        for (let i = 0; i < purchaseAmount; i++) {
            sum += 20 + theoreticalAmt * 20;
            theoreticalAmt++;
        }
        return sum;
    }

    static buildTooltip(gameState: GameState): any {
        return (
            <div className="relics-tooltip">
                <div className="relics-tooltip__description">
                    It takes money to store money.
                    <br/>+50 money cap.
                </div>
                <div className="relics-tooltip__cost">
                    <div className={"money-text"}>Money: {BankTransaction.getCost(gameState, 1)}</div>
                </div>
            </div>
        );
    }
}
