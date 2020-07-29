import * as React from "react";
import { GameState } from "../settings/game-state";
import {RelicGenerator} from "../economy/generators/RelicGenerator";

type GeneratorProps = {
    gameState: GameState,
    onPurchase: any,
    onAddCurrency: any
}

export class Generators extends React.Component<GeneratorProps> {
    readonly studentPurchasable = new RelicGenerator();

    render() {

        const { gameState, onAddCurrency, onPurchase } = this.props;
        return (
            <div>
                <button onClick={() => onAddCurrency("relics", 1)}>Look for relics</button>
                <br/>
                <p>You have ${gameState.currencies.relics} relics</p>
                <br/>
                <div>
                    Hire some students to dust off relics for you.
                    (You have {gameState.generators.relicGenerator})
                    <button onClick={() => onPurchase(1, this.studentPurchasable)}>{this.studentPurchasable.getCost(gameState, 1)}</button>
                </div>
            </div>
        );
    }
}
