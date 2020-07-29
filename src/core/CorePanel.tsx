import * as React from "react";
import {loadSave, newSave, saveGame, saveGameExists} from "./saveService";
import {Header} from "./Header";
import {Generators} from "../generators/generators";
import {Settings} from "../settings/Settings";
import {GameState} from "./game-state";
import {IPurchasable} from "../economy/IPurchaseable";
import {GameClock} from "./game-clock";
import {AdventureLog} from "../adventure-log/AdventureLog";
import {MAX_LOG_SIZE} from "../config/constants";

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
        this.addJournalEntry(newState, "You dust off some potsherds.")
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

    addJournalEntry(gameState: GameState, entry: string){
        gameState.journalState.entries.push(entry);
        if(gameState.journalState.entries.length >= MAX_LOG_SIZE) {
            gameState.journalState.entries.shift();
        }
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
                    <Header gameState={this.state.gameState}/>
                </header>
                <Generators
                    gameState={this.state.gameState}
                    onAddCurrency={(currencyName: string, currencyAmount: number) => this.addCurrency(currencyName, currencyAmount)}
                    onPurchase={(purchaseAmount: number, purchaseType: IPurchasable) => this.makePurchase(purchaseAmount, purchaseType)}
                />
                <div>
                    <AdventureLog journalState={this.state.gameState.journalState}/>
                </div>
                <Settings
                    gameState={this.state.gameState}
                    onSave={() => this.save()}
                />
            </div>
        );
    }
}
