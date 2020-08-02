import {Research} from "../Transaction";
import {GameState} from "../../core/game-state";
import React from "react";

export class StudentKnowledge extends Research {
    static updateClock = false;

    static commitTransaction(gameState: GameState, amount: number): GameState {
        if(StudentKnowledge.isValidPurchase(gameState, amount)) {
            gameState.resourceState.knowledge -= 5;
            gameState.researchState.studentKnowledge = true;
        }
        return gameState;
    }

    static isValidPurchase(gameState: GameState, amount: number): boolean {
        return gameState.resourceState.knowledge >= 5;
    }

    static buildTooltip(gameState: GameState): any {
        return (
            <div className="relics-tooltip">
                <div className="relics-tooltip__description">
                    I know enough about this to teach others to do the work, albeit at a reduced efficiency.
                </div>
                <div className="relics-tooltip__cost">
                    <div className="knowledge-text">Knowledge: 5</div>
                </div>
            </div>
        );
    }
    static isAvailable(gameState: GameState): boolean {
        return !gameState.researchState.studentKnowledge;
    }

    static title = "Studious Students";
    static id = "student-knowledge";
    static className = "knowledge-button";
}
