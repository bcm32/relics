import { Transaction } from "../Transaction";
import {GameState} from "../../core/game-state";
import React from "react";

export class StudentTransaction extends Transaction{
    updateClock = false;

    static commitTransaction(gameState: GameState, amount: number): GameState {
        if(StudentTransaction.isValidPurchase(gameState, amount)) {
            const currCost = StudentTransaction.getCost(gameState, amount);

            gameState.resourceState.relics -= currCost;
            gameState.resourceState.students += amount;
        }
        return gameState;
    }

    static isValidPurchase(gameState: GameState, amount: number): boolean {
        const currCost = StudentTransaction.getCost(gameState, amount);

        return gameState.resourceState.relics >= currCost;
    }

    static getCost(gameState: GameState, purchaseAmount: number) {
        let sum = 0;
        let theoreticalAmt = gameState.resourceState.students || 0;
        for (let i = 0; i < purchaseAmount; i++) {
            sum += 10 + theoreticalAmt * 5;
            theoreticalAmt++;
        }
        return sum;
    }

    static buildTooltip(gameState: GameState): any {
        return (
            <div className="relics-tooltip">
                <div className="relics-tooltip__description">
                    Hire some students to dust off relics for you.
                    They work for relics.
                    { gameState.achievements.labUnlocked && (<div className={"knowledge-text"}>+5 Knowledge cap</div>)}
                </div>
                <div className="relics-tooltip__cost">
                    <div>Relics: {StudentTransaction.getCost(gameState, 1)}</div>
                </div>
            </div>
        );
    }
}
