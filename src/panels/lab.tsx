import React from "react";
import {GameState} from "../core/game-state";
import {labFirstUnlock} from "../core/achievements";
import {RelicsButton} from "../shared/relicsButton";
import {KnowledgeTransaction} from "../economy/transactions/KnowledgeTransaction";
import {StudentKnowledge} from "../economy/researches/studentKnowledge";
import {AssignWorkerOptions} from "../shared/AssignWorkerOptions";
import {
    assignStudyRelics,
    countAvailableStudents,
    removeStudyRelics
} from "../economy/jobAssignments";
import ReactTooltip from "react-tooltip";
import {Profit} from "../economy/researches/profit";
import {BetterShovels} from "../economy/researches/betterShovels";
import {BloodWard} from "../economy/researches/bloodWard";

type LabProps = {
    gameState: GameState;
    onPurchase: any;
}

export class ResearchLab extends React.Component<LabProps> {
    componentDidMount(): void {
        labFirstUnlock(this.props.gameState);
    }

    assignStudentsStudy = (amount: number) => assignStudyRelics(amount, this.props.gameState);
    removeStudentsStudy = (amount: number) => removeStudyRelics(amount, this.props.gameState);

    render() {
        const { gameState, onPurchase } = this.props;
        const availableStudents = countAvailableStudents(gameState);
        return (
            <div>
                <div className="button-container">
                    <RelicsButton
                        disabled={!KnowledgeTransaction.isValidPurchase(gameState, 1)}
                        onClick={() => onPurchase(1, KnowledgeTransaction.commitTransaction)}
                        id="studyRelics"
                        tooltip={KnowledgeTransaction.buildTooltip(gameState)}
                    >
                        Study Relics
                    </RelicsButton>
                </div>
                {gameState.researchState.studentKnowledge &&
                    <div>
                        <AssignWorkerOptions
                            id="studentsStudying"
                            assignWorkers={(amount: number) =>this.assignStudentsStudy(amount)}
                            removeWorkers={(amount:number) => this.removeStudentsStudy(amount)}
                            currentlyAssigned={gameState.jobAssignments.studyRelics}
                            availableWorkers={availableStudents}
                            tooltip={"Produces 1 knowledge per 100 relics."}
                        >
                            Student Studying Relics
                        </AssignWorkerOptions>
                    </div>
                }

                <div>
                    <p>Research</p>
                    {!gameState.researchState.studentKnowledge && (
                            <RelicsButton
                                disabled={!StudentKnowledge.isValidPurchase(gameState, 1)}
                                onClick={() => onPurchase(1, StudentKnowledge.commitTransaction)}
                                id="researchStudyRelics"
                                className={"knowledge-button"}
                                tooltip={StudentKnowledge.buildTooltip(gameState)}
                            >
                                Studious Students
                            </RelicsButton>
                    )}
                    {(gameState.researchState.studentKnowledge && !gameState.researchState.profiteering) && (
                        <RelicsButton
                            disabled={!Profit.isValidPurchase(gameState, 1)}
                            onClick={() => onPurchase(1, Profit.commitTransaction)}
                            id="profiteering"
                            className={"knowledge-button"}
                            tooltip={Profit.buildTooltip(gameState)}
                        >
                            Procure Funding
                        </RelicsButton>
                    )}
                    {(gameState.researchState.profiteering && !gameState.researchState.betterShovels) && (
                        <RelicsButton
                            disabled={!BetterShovels.isValidPurchase(gameState, 1)}
                            onClick={() => onPurchase(1, BetterShovels.commitTransaction)}
                            id="shovel1"
                            className={"money-button"}
                            tooltip={BetterShovels.buildTooltip(gameState)}
                        >
                            Better Shovels
                        </RelicsButton>
                    )}
                    {(gameState.researchState.profiteering && !gameState.researchState.bloodWard) && (
                        <RelicsButton
                            disabled={!BloodWard.isValidPurchase(gameState, 1)}
                            onClick={() => onPurchase(1, BloodWard.commitTransaction)}
                            id="blood-ward"
                            className={"blood-button"}
                            tooltip={BloodWard.buildTooltip(gameState)}
                        >
                            Inscribe a ward
                        </RelicsButton>
                    )}
                </div>
            </div>
        );
    }
}
