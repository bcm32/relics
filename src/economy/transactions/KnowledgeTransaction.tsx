import {GameState} from "../../core/game-state";
import {Transaction} from "../Transaction";
import React from "react";

export class KnowledgeTransaction extends Transaction {
    static updateClock = false;

    static commitTransaction(gameState: GameState, amount: number): GameState {
        if(KnowledgeTransaction.isValidPurchase(gameState, amount)) {
            const currCost = KnowledgeTransaction.getCost(gameState, amount);

            gameState.resourceState.relics -= currCost;
            gameState.resourceState.knowledge += amount;
        }
        return gameState;
    }

    static isValidPurchase(gameState: GameState, amount: number): boolean {
        const currCost = KnowledgeTransaction.getCost(gameState, amount);
        return gameState.resourceState.relics >= currCost;
    }

    static getCost(gameState: GameState, purchaseAmount: number) {
        return 100 * purchaseAmount;
    }

    static buildTooltip(gameState: GameState): any {
        return (
            <div className="relics-tooltip">
                <div className="relics-tooltip__description">
                    Peruse your collection, perhaps you can find something useful.
                </div>
                <div className="relics-tooltip__cost">
                    <div>Relics: 100</div>
                </div>
            </div>
        );
    }
}
