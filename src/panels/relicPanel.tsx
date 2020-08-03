import * as React from "react";
import { GameState } from "../core/game-state";
import {StudentTransaction} from "../economy/transactions/studentTransaction";
import {
    assignGatherers,
    assignGiftShop,
    countAvailableStudents,
    removeGatherers,
    removeGiftShop
} from "../economy/jobAssignments";
import {RelicsButton} from "../shared/relicsButton";
import {AssignWorkerOptions} from "../shared/AssignWorkerOptions";
import {ShedTransaction} from "../economy/transactions/shedTransaction";
import {BankTransaction} from "../economy/transactions/bankTransaction";

type GeneratorProps = {
    gameState: GameState,
    onPurchase: any,
    onAddCurrency: any
}

export class RelicPanel extends React.Component<GeneratorProps> {

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
                    <div className="panel__assignments-container">
                        <h2>Job Assignments</h2>
                        <AssignWorkerOptions
                            assignWorkers={(amount: number) => assignGatherers(amount, this.props.gameState)}
                            removeWorkers={(amount:number) => removeGatherers(amount, this.props.gameState)}
                            currentlyAssigned={gameState.jobAssignments.gatherRelics}
                            availableWorkers={availableStudents}>
                            Gather Relics
                        </AssignWorkerOptions>

                        {gameState.researchState.tours &&
                            <div>
                                <AssignWorkerOptions
                                    assignWorkers={(amount: number) => assignGiftShop(amount, this.props.gameState)}
                                    removeWorkers={(amount:number) => removeGiftShop(amount, this.props.gameState)}
                                    currentlyAssigned={gameState.jobAssignments.giftShop}
                                    availableWorkers={availableStudents}
                                >
                                    Gift Shop
                                </AssignWorkerOptions>
                            </div>
                        }
                    </div>
                }
                <br/>
                <div>
                    <div className="button-container">
                        <RelicsButton
                                disabled={!StudentTransaction.isValidPurchase(gameState, 1)}
                                onClick={() => onPurchase(1, StudentTransaction.commitTransaction)}
                                id="hireStudent"
                                tooltip={StudentTransaction.buildTooltip(gameState)}
                        >
                            Hire a Student
                        </RelicsButton>
                    </div>
                    {gameState.researchState.profiteering && <p>Buildings:</p> }
                    {gameState.researchState.profiteering &&
                        <RelicsButton
                            disabled={!ShedTransaction.isValidPurchase(gameState, 1)}
                            onClick={() => onPurchase(1, ShedTransaction.commitTransaction)}
                            id="shed"
                            tooltip={ShedTransaction.buildTooltip(gameState)}
                        >
                            Storage Shed: {gameState.resourceState.sheds}
                        </RelicsButton>
                    }
                    {gameState.researchState.banksOpen &&
                        <RelicsButton
                            disabled={!BankTransaction.isValidPurchase(gameState, 1)}
                            onClick={() => onPurchase(1, BankTransaction.commitTransaction)}
                            id="banks"
                            tooltip={BankTransaction.buildTooltip(gameState)}
                        >
                            Company Banks: {gameState.resourceState.banks}
                        </RelicsButton>
                    }
                </div>
            </div>
        );
    }
}
