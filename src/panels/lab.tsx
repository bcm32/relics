import React from "react";
import {GameState} from "../core/game-state";
import {labFirstUnlock} from "../core/achievements";
import {RelicsButton} from "../shared/relicsButton";
import {KnowledgeTransaction} from "../economy/transactions/KnowledgeTransaction";
import {AssignWorkerOptions} from "../shared/AssignWorkerOptions";
import {
    assignStudyRelics,
    countAvailableStudents,
    removeStudyRelics
} from "../economy/jobAssignments";
import {getAvailableResearches} from "../economy/researchManager";
import {ResearchButton} from "../shared/researchButton";
import {Research} from "../economy/Transaction";

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

    createResearchButton(research: typeof Research): any {
        return (
            <ResearchButton key={research.id} research={research} gameState={this.props.gameState} onPurchase={this.props.onPurchase}/>
        );
    }

    render() {
        const { gameState, onPurchase } = this.props;
        const availableStudents = countAvailableStudents(gameState);
        const availableResearch = getAvailableResearches(gameState).map((research) => this.createResearchButton(research));

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
                    { availableResearch }
                </div>
            </div>
        );
    }
}
