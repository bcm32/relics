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

type LabProps = {
    gameState: GameState;
    onPurchase: any;
}

export class ResearchLab extends React.Component<LabProps> {
    readonly knowledgeTransaction = new KnowledgeTransaction();
    readonly studentKnowledge = new StudentKnowledge();
    readonly profiteering = new Profit();
    readonly betterShovels = new BetterShovels();


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
                        disabled={!this.knowledgeTransaction.isValidPurchase(gameState, 1)}
                        onClick={() => onPurchase(1, this.knowledgeTransaction)}
                        id="studyRelics"
                        tooltip={"Peruse your collection, perhaps you can find something useful.\n"
                        + "Relics: " + this.knowledgeTransaction.getCost(gameState, 1)}
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
                                disabled={!this.studentKnowledge.isValidPurchase(gameState, 1)}
                                onClick={() => onPurchase(1, this.studentKnowledge)}
                                id="researchStudyRelics"
                                className={"knowledge-button"}
                                tooltip={"I know enough about this to teach others to do the work, albeit at a reduced efficiency.\n"
                                    + "Knowledge: 10"}
                            >
                                Studious Students
                            </RelicsButton>
                    )}
                    {(gameState.researchState.studentKnowledge && !gameState.researchState.profiteering) && (
                        <RelicsButton
                            disabled={!this.profiteering.isValidPurchase(gameState, 1)}
                            onClick={() => onPurchase(1, this.profiteering)}
                            id="profiteering"
                            className={"knowledge-button"}
                            tooltip={"With your student's help, you know enough now to fund this endeavor. A little embellishment never hurt..\n"
                            + "Knowledge: 20"}
                        >
                            Procure Funding
                        </RelicsButton>
                    )}
                    {(gameState.researchState.profiteering && !gameState.researchState.betterShovels) && (
                        <RelicsButton
                            disabled={!this.betterShovels.isValidPurchase(gameState, 1)}
                            onClick={() => onPurchase(1, this.betterShovels)}
                            id="shovel1"
                            className={"money-button"}
                            tooltip={"Buy the team their very first shovel. It's better than none.\n"
                            + "Money: 50"}
                        >
                            Better Shovels
                        </RelicsButton>
                    )}
                </div>
            </div>
        );
    }
}
