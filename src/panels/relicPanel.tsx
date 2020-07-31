import * as React from "react";
import { GameState } from "../core/game-state";
import {RelicGenerator} from "../economy/transactions/relicGenerator";
import {StudentTransaction} from "../economy/transactions/studentTransaction";
import {assignGatherers, countAvailableStudents, removeGatherers} from "../economy/jobAssignments";
import {RelicsButton} from "../shared/relicsButton";

type GeneratorProps = {
    gameState: GameState,
    onPurchase: any,
    onAddCurrency: any
}

export class RelicPanel extends React.Component<GeneratorProps> {
    readonly studentTransaction = new StudentTransaction();

    assignGather() {
        const { gameState } = this.props;
        assignGatherers(1, gameState);
    }
    removeGather() {
        const { gameState } = this.props;
        removeGatherers(1, gameState);
    }

    render() {
        const { gameState, onAddCurrency, onPurchase } = this.props;
        const availableStudents = countAvailableStudents(gameState);
        const studentsHired = gameState.resourceState.students >= 1;

        return (
            <div className="panel--left-align">
                <div className="button-container">
                    <RelicsButton onClick={() => onAddCurrency("relics", 1)}>Look for relics</RelicsButton>
                </div>
                {studentsHired &&
                    <div>
                        <div>Students:</div>
                        <div>
                            Gathering Relics: {gameState.jobAssignments.gatherRelics}
                            <span><RelicsButton
                                compact={true}
                                disabled={availableStudents <= 0}
                                onClick={() => this.assignGather()}>+</RelicsButton>
                            <RelicsButton
                                compact={true}
                                disabled={gameState.jobAssignments.gatherRelics <= 0}
                                onClick={() => this.removeGather()}
                            >
                                -
                            </RelicsButton></span>
                        </div>
                    </div>
                }
                <br/>
                <div>
                    <div className="button-container">
                        <RelicsButton
                                disabled={!this.studentTransaction.isValidPurchase(gameState, 1)}
                                onClick={() => onPurchase(1, this.studentTransaction)}
                                id="hireStudent"
                                tooltip={"Hire some students to dust off relics for you. They work for relics.\n"
                                    + "Relics: " + this.studentTransaction.getCost(gameState, 1)}
                        >
                            Hire a Student
                        </RelicsButton>
                    </div>
                </div>
            </div>
        );
    }
}
