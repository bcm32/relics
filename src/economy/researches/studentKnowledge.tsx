import { Transaction } from "../Transaction";
import {GameState} from "../../core/game-state";
import React from "react";

export class StudentKnowledge extends Transaction {
    static updateClock = false;

    static commitTransaction(gameState: GameState, amount: number): GameState {
        if(StudentKnowledge.isValidPurchase(gameState, amount)) {
            gameState.resourceState.knowledge -= 10;
            gameState.researchState.studentKnowledge = true;
        }
        return gameState;
    }

    static isValidPurchase(gameState: GameState, amount: number): boolean {
        return gameState.resourceState.knowledge >= 10;
    }

    static buildTooltip(gameState: GameState): any {
        return (
            <div className="relics-tooltip">
                <div className="relics-tooltip__description">
                    I know enough about this to teach others to do the work, albeit at a reduced efficiency.
                </div>
                <div className="relics-tooltip__cost">
                    <div className="knowledge-text">Knowledge: 10</div>
                </div>
            </div>
        );
    }
}
