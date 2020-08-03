import * as React from "react";
import { GameState } from "../core/game-state";
import {RelicsButton} from "../shared/relicsButton";
import {BleedingStonesTransaction} from "../economy/rituals/bleedingStones";

type RitualProps = {
    gameState: GameState,
    onPurchase: any,
}

export class RitualPanel extends React.Component<RitualProps> {

    render() {
        const {gameState, onPurchase} = this.props;
        return (
            <div className="panel--left-align">
                <div>
                    <RelicsButton
                        disabled={!BleedingStonesTransaction.isValidPurchase(gameState, 1)}
                        onClick={() => onPurchase(1, BleedingStonesTransaction.commitTransaction)}
                        id="bloodstone"
                        tooltip={BleedingStonesTransaction.buildTooltip(gameState)}
                    >
                        Bleeding Stone: {gameState.resourceState.bleedingStones}
                    </RelicsButton>
                </div>
            </div>
        );
    }
}
