import * as React from "react";
import {loadSave, newSave, saveGame, saveGameExists} from "../settings/saveService";
import {AdventureLog} from "../adventure-log/adventure-log";
import {Generators} from "../generators/generators";
import {Settings} from "../settings/Settings";
import {GameState} from "../settings/game-state";
import {IPurchasable} from "../economy/IPurchaseable";

type CoreProps = {}
type CoreState = {
    gameState: GameState
}

export class CorePanel<CoreProps, CoreState> extends React.Component {
    clock: any;
    readonly state = {gameState: saveGameExists() ? loadSave() : newSave()};

    componentDidMount() {
        this.clock = setInterval(
            () => saveGame(this.state.gameState),
            30000
        );
    }

    addCurrency(currencyName: string, currencyAmount: number) {
        // TODO: Abstract this for manual action & future FAME multiplier
        const newState = {...this.state.gameState};
        newState.currencies.relics += currencyAmount;
        this.setState({gameState: newState})
    }

    makePurchase(purchaseAmount: number, purchaseType: IPurchasable) {
        let newState = {...this.state.gameState};
        newState = purchaseType.commitTransaction(newState, purchaseAmount);

        this.setState({gameState: newState})
    }

    save() {
        const newState = {...this.state.gameState};
        newState.saveTime = new Date();
        this.setState({gameState: newState});
        saveGame(newState);
    }

    render() {
        return (
            <div>
                <header className="App-header">
                    <AdventureLog name="Adventurer"/>
                </header>
                <Generators
                    gameState={this.state.gameState}
                    onAddCurrency={(currencyName: string, currencyAmount: number) => this.addCurrency(currencyName, currencyAmount)}
                    onPurchase={(purchaseAmount: number, purchaseType: IPurchasable) => this.makePurchase(purchaseAmount, purchaseType)}
                />
                <Settings
                    gameState={this.state.gameState}
                    onSave={() => this.save()}
                />
            </div>
        );
    }
}
