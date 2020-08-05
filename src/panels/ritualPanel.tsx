import * as React from "react";
import { GameState } from "../core/game-state";
import {RelicsButton} from "../shared/relicsButton";
import {BleedingStonesTransaction} from "../economy/rituals/bleedingStones";
import {Observatory} from "../astronomy/observatory";

type RitualProps = {
    gameState: GameState,
    onPurchase: any,
}

export class RitualPanel extends React.Component<RitualProps> {
    render() {
        const {gameState, onPurchase} = this.props;
        let alertClass = "blood-meter__alert ";
        if(gameState.resourceState.bloodChance < 2) {
            alertClass += "blood-meter__alert--ok";
        }
        else if(gameState.resourceState.bloodChance < 5) {
            alertClass += "blood-meter__alert--medium";
        }
        else alertClass += "blood-meter__alert--high";

        return (
            <div className="panel--left-align ritual-panel">
                <div>
                    <h2>Constructs:</h2>
                    <div className="button-container">
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
                <div>
                    {gameState.researchState.bloodMeter && (
                        <div className="outline-container blood-meter">
                            <div>
                                <div>Haunt Meter:</div>
                                <div>Chance: {gameState.resourceState.bloodChance.toFixed(1)}%</div>
                                <div>Cost:   {gameState.resourceState.bloodLoss.toFixed()} Blood</div>
                            </div>
                            <div className={alertClass}/>
                        </div>
                    )}
                    <Observatory gameState={gameState}/>
                </div>
            </div>
        );
    }
}
