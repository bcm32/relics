import { Transaction } from "../Transaction";
import {GameState} from "../../core/game-state";
import React from "react";
import {countAvailableStudents, removeAssignedStudents} from "../jobAssignments";

export class SacrificeTransaction extends Transaction{
    updateClock = false;

    static commitTransaction(gameState: GameState, amount: number): GameState {
        if(SacrificeTransaction.isValidPurchase(gameState, amount)) {
            const available = countAvailableStudents(gameState);
            if(amount > available) {
                removeAssignedStudents(gameState, amount - available);
            }
            gameState.resourceState.blood -= amount;
            gameState.resourceState.students -= amount;
        }

        return gameState;
    }

    static isValidPurchase(gameState: GameState, amount: number): boolean {
        const currCost = SacrificeTransaction.getCost(gameState, amount);

        return gameState.resourceState.students >= currCost;
    }

    static getCost(gameState: GameState, purchaseAmount: number) {
        return purchaseAmount;
    }

    static buildTooltip(gameState: GameState): any {
        return (
            <div className="relics-tooltip">
                <div className="relics-tooltip__description">
                    Sacrifice a student. This may be useful later.
                    { gameState.achievements.labUnlocked && (<div className={"blood-text"}>+1 Blood</div>)}
                </div>
            </div>
        );
    }
}
