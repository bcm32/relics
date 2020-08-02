import { Transaction } from "../Transaction";
import {GameState} from "../../core/game-state";
import React from "react";

export class ShedTransaction extends Transaction{
    updateClock = false;

    static commitTransaction(gameState: GameState, amount: number): GameState {
        if(ShedTransaction.isValidPurchase(gameState, amount)) {
            const currCost = ShedTransaction.getCost(gameState, amount);

            gameState.resourceState.money -= currCost;
            gameState.resourceState.sheds += amount;
        }
        return gameState;
    }

    static isValidPurchase(gameState: GameState, amount: number): boolean {
        const currCost = ShedTransaction.getCost(gameState, amount);
        return gameState.resourceState.money >= currCost;
    }

    static getCost(gameState: GameState, purchaseAmount: number) {
        let sum = 0;
        let theoreticalAmt = gameState.resourceState.sheds || 0;
        for (let i = 0; i < purchaseAmount; i++) {
            sum += 5 + theoreticalAmt * 15;
            theoreticalAmt++;
        }
        return sum;
    }

    static buildTooltip(gameState: GameState): any {
        return (
            <div className="relics-tooltip">
                <div className="relics-tooltip__description">
                    It turns out we don't need to keep our relics in a pile under a tarp.
                    <br/>+50 relic storage.
                </div>
                <div className="relics-tooltip__cost">
                    <div className={"money-text"}>Money: {ShedTransaction.getCost(gameState, 1)}</div>
                </div>
            </div>
        );
    }
}
