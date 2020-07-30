import * as React from "react";
import {loadSave, newSave, saveGame, saveGameExists} from "./saveService";
import {Header} from "../layout/Header";
import {Generators} from "../generators/generators";
import {Settings} from "../settings/Settings";
import {GameState} from "./game-state";
import {IPurchasable} from "../economy/IPurchaseable";
import {GameClock} from "./game-clock";
import {AdventureLog} from "../adventure-log/AdventureLog";
import {addJournalEntry, clearJournal} from "../adventure-log/journal";

type CoreProps = {}
type CoreState = {
    gameState: GameState
}

export class CorePanel<CoreProps, CoreState> extends React.Component {
    clock: GameClock | undefined;
    readonly state = {gameState: saveGameExists() ? loadSave() : newSave()};

    componentDidMount(): void {
        this.clock = new GameClock(this.state.gameState, (newState: GameState) => this.onTick(newState));
    }

    onTick(newState: GameState) {
        this.setState({gameState: newState});
    }

    addCurrency(currencyName: string, currencyAmount: number) {
        // TODO: Abstract this for manual action & future FAME multiplier
        const newState = {...this.state.gameState};
        newState.currencies.relics += currencyAmount;
        addJournalEntry(newState, "You dust off some potsherds.")
        this.setState({gameState: newState})
    }

    makePurchase(purchaseAmount: number, purchaseType: IPurchasable) {
        let newState = {...this.state.gameState};
        newState = purchaseType.commitTransaction(newState, purchaseAmount);

        this.setState({gameState: newState});
        if(purchaseType.updateClock) {
            // @ts-ignore
            this.clock.updateState(newState);
        }
    }

    clearLog() {
        clearJournal(this.state.gameState)
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
                <header className="app-header">
                    <Header gameState={this.state.gameState}/>
                </header>
                <div className="core-panel__flex">
                    <Generators
                        gameState={this.state.gameState}
                        onAddCurrency={(currencyName: string, currencyAmount: number) => this.addCurrency(currencyName, currencyAmount)}
                        onPurchase={(purchaseAmount: number, purchaseType: IPurchasable) => this.makePurchase(purchaseAmount, purchaseType)}
                    />
                    <div>
                        <AdventureLog clearLog={() => this.clearLog()} journalState={this.state.gameState.journalState}/>
                    </div>
                    <Settings
                        gameState={this.state.gameState}
                        onSave={() => this.save()}
                    />
                </div>
            </div>
        );
    }
}
