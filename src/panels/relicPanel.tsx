import * as React from "react";
import { GameState } from "../core/game-state";
import {RelicGenerator} from "../economy/transactions/relicGenerator";
import {StudentTransaction} from "../economy/transactions/studentTransaction";
import {assignGatherers, countAvailableStudents, removeGatherers} from "../economy/jobAssignments";
import {RelicsButton} from "../shared/relicsButton";
import {KnowledgeTransaction} from "../economy/transactions/KnowledgeTransaction";
import {AssignWorkerOptions} from "../shared/AssignWorkerOptions";

type GeneratorProps = {
    gameState: GameState,
    onPurchase: any,
    onAddCurrency: any
}

export class RelicPanel extends React.Component<GeneratorProps> {
    readonly studentTransaction = new StudentTransaction();

    assignGather(amount: number) {
        const { gameState } = this.props;
        assignGatherers(amount, gameState);
    }
    removeGather(amount: number) {
        const { gameState } = this.props;
        removeGatherers(amount, gameState);
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
                    <AssignWorkerOptions
                        assignWorkers={(amount: number) =>this.assignGather(amount)}
                        removeWorkers={(amount:number) => this.removeGather(amount)}
                        currentlyAssigned={gameState.jobAssignments.gatherRelics}
                        availableWorkers={availableStudents}>
                        Gathering Relics
                    </AssignWorkerOptions>
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
