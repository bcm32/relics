import React from "react";
import {RelicsButton} from "./relicsButton";
import {Research} from "../economy/Transaction";
import {GameState} from "../core/game-state";

type ResearchButtonProps = {
    research: typeof Research;
    gameState: GameState;
    onPurchase: any;
}

export class ResearchButton extends React.Component<ResearchButtonProps>{
    render() {
        const {gameState, research, onPurchase} = this.props;
        return (
            <RelicsButton
                disabled={!research.isValidPurchase(gameState, 1)}
                onClick={() => onPurchase(1, research.commitTransaction)}
                id={research.id}
                key={research.id}
                className={research.className}
                tooltip={research.buildTooltip(gameState)}
            >
                {research.title}
            </RelicsButton>
        );
    }
}