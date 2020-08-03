import * as React from "react";
import {loadSave, newSave, saveGame, saveGameExists} from "./saveService";
import {RelicPanel} from "../panels/relicPanel";
import {Settings} from "../panels/settings";
import {GameState} from "./game-state";
import {GameClock} from "./game-clock";
import {GENERATORS_PANEL_KEY, LAB_KEY, RITUAL_PANEL_KEY, SETTINGS_PANEL_KEY} from "../config/constants";
import {addJournalEntry, clearJournal} from "./journal";
import {AdventureLog} from "../panels/adventureLog";
import {ResourcePanel} from "../panels/resourcePanel";
import {PanelSelector} from "../layout/panelSelector";
import {ResearchLab} from "../panels/lab";
import {RitualPanel} from "../panels/ritualPanel";

type CoreProps = {}
type CoreState = {
    gameState: GameState,
    activePanel: string
}

export class CorePanel extends React.Component<CoreProps, CoreState> {
    clock: GameClock | undefined;
    readonly state = {
        gameState: saveGameExists() ? loadSave() : newSave(),
        activePanel: GENERATORS_PANEL_KEY
    };

    componentDidMount(): void {
        this.clock = new GameClock(this.state.gameState, (newState: GameState) => this.onTick(newState));
        this.setState({activePanel: GENERATORS_PANEL_KEY});
    }

    onTick(newState: GameState) {
        this.setState({gameState: newState});
    }

    addCurrency(currencyName: string, currencyAmount: number) {
        const newState = {...this.state.gameState};
        let relicRate = currencyAmount;
        if(this.state.gameState.researchState.mapTheGrounds) relicRate += 1;
        newState.resourceState.relics += relicRate;
        if(newState.resourceState.relics > newState.resourceState.relicCap) newState.resourceState.relics = newState.resourceState.relicCap;
        addJournalEntry(newState, "You dust off some potsherds.");
        this.setState({gameState: newState})
    }

    makePurchase(purchaseAmount: number, transaction: any) {
        let newState = {...this.state.gameState};
        newState = transaction(newState, purchaseAmount);

        this.setState({gameState: newState});
        // if(purchaseType.updateClock) {
        //     // @ts-ignore
        //     this.clock.updateState(newState);
        // }
    }

    clearLog() {
        clearJournal(this.state.gameState)
    }

    changeActivePanel(panelKey: string) {
        this.setState({activePanel: panelKey});
    }

    save() {
        const newState = {...this.state.gameState};
        this.setState({gameState: newState});
        saveGame(newState, true);
    }

    clearSave() {
        // eslint-disable-next-line no-restricted-globals
        const response = confirm("Are you sure you want to clear your save?");
        if (!response) {
            return;
        }
        // @ts-ignore
        this.clock.clearClock();
        const newState = {gameState: newSave()};
        newState.gameState.saveTime = new Date();
        this.setState(newState);
        this.clock = new GameClock(newState.gameState, (newState: GameState) => this.onTick(newState));
        saveGame(newState.gameState);
    }

    private importSave(save: GameState | null) {
        if(save == null) return;
        // @ts-ignore
        this.clock.clearClock();
        const newState = {gameState: save};
        this.setState(newState);
        this.clock = new GameClock(newState.gameState, (newState: GameState) => this.onTick(newState));
        saveGame(save);
    }

    render() {
        let activePanel;
        switch (this.state.activePanel) {
            case SETTINGS_PANEL_KEY:
                activePanel = (
                    <Settings
                        gameState={this.state.gameState}
                        onSave={() => this.save()}
                        onClearSave={() => this.clearSave()}
                        onImportSave={(save: GameState | null) => this.importSave(save)}
                    />
                );
                break;
            case LAB_KEY:
                activePanel = (
                    <ResearchLab
                        gameState={this.state.gameState}
                        onPurchase={(purchaseAmount: number, transaction: any) => this.makePurchase(purchaseAmount, transaction)}
                    />
                );
                break;
            case RITUAL_PANEL_KEY:
                activePanel = (
                    <RitualPanel
                        gameState={this.state.gameState}
                        onPurchase={(purchaseAmount: number, transaction: any) => this.makePurchase(purchaseAmount, transaction)}
                    />
                );
                break;
            case GENERATORS_PANEL_KEY:
            default:
                activePanel = (
                    <RelicPanel
                        gameState={this.state.gameState}
                        onAddCurrency={(currencyName: string, currencyAmount: number) => this.addCurrency(currencyName, currencyAmount)}
                        onPurchase={(purchaseAmount: number, transaction: any) => this.makePurchase(purchaseAmount, transaction)}
                    />
                );

        }

        return (
            <div className="core-panel">
                <div className="core-panel__flex">
                    <div className="core-panel__left-column">
                        <AdventureLog clearLog={() => this.clearLog()} journalState={this.state.gameState.journalState}/>
                    </div>
                    <div className="core-panel__center-column">
                        <PanelSelector onChangePanel={(panelKey: string) => this.changeActivePanel(panelKey)}
                            selected={this.state.activePanel}
                            gameState={this.state.gameState}
                        />
                        {activePanel}
                    </div>
                    <div className="core-panel__right-column">
                        <ResourcePanel gameState={this.state.gameState}/>
                    </div>
                </div>

            </div>
        );
    }
}
