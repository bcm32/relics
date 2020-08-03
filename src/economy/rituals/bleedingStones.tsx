import {safeResource, Transaction} from "../Transaction";
import {GameState} from "../../core/game-state";
import React from "react";

export class BleedingStonesTransaction extends Transaction{
    updateClock = false;

    static commitTransaction(gameState: GameState, amount: number): GameState {
        if(BleedingStonesTransaction.isValidPurchase(gameState, amount)) {
            const costs = BleedingStonesTransaction.getCost(gameState, amount);
            gameState.resourceState.blood -= costs[0];
            gameState.resourceState.relics -= costs[1];
            gameState.resourceState.knowledge -= costs[2];

            gameState.resourceState.bleedingStones = safeResource(gameState.resourceState.bleedingStones) + amount;
        }
        return gameState;
    }

    static isValidPurchase(gameState: GameState, amount: number): boolean {
        const costs = BleedingStonesTransaction.getCost(gameState, amount);
        return gameState.resourceState.blood >= costs[0]
            && gameState.resourceState.relics >= costs[1]
            && gameState.resourceState.knowledge >= costs[2];
    }

    static getCost(gameState: GameState, purchaseAmount: number) {
        let bloodSum = 0;
        let knowledgeSum = 0;
        let relicSum = 0;

        let theoreticalAmt = gameState.resourceState.bleedingStones || 0;
        for (let i = 0; i < purchaseAmount; i++) {
            bloodSum += 1 + theoreticalAmt * 5;
            knowledgeSum += 5 + theoreticalAmt * 5;
            relicSum += 50 + theoreticalAmt * 5;

            theoreticalAmt++;
        }
        return [bloodSum, relicSum, knowledgeSum];
    }

    static buildTooltip(gameState: GameState): any {
        const costs = BleedingStonesTransaction.getCost(gameState, 1);

        return (
            <div className="relics-tooltip">
                <div className="relics-tooltip__description">
                    Anoint a stone, and it will bleed like man.
                    <br/>+.2 blood/s.
                </div>
                <div className="relics-tooltip__cost">
                    <div>Relics: {costs[1]}</div>
                    <div className={"blood-text"}>Blood: {costs[0]}</div>
                    <div className={"knowledge-text"}>Knowledge: {costs[2]}</div>
                </div>
            </div>
        );
    }
}
