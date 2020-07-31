import React from "react";
import {GameState} from "../core/game-state";
import {labFirstUnlock} from "../core/achievements";
import {RelicsButton} from "../shared/relicsButton";
import {KnowledgeTransaction} from "../economy/transactions/KnowledgeTransaction";

type LabProps = {
    gameState: GameState;
    onPurchase: any;
}

export class ResearchLab extends React.Component<LabProps> {
    readonly knowledgeTransaction = new KnowledgeTransaction();

    componentDidMount(): void {
        labFirstUnlock(this.props.gameState);
    }

    render() {
        const { gameState, onPurchase } = this.props;
        return (
            <div>
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
        );
    }
}
