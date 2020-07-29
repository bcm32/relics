import {saveGame} from "./saveService";
import {GameState} from "./game-state";
import {TICK_SPEED} from "../config/constants";

export class GameClock {
    saveClockId: any;
    resourceClockId: any;
    gameState: GameState; // Not readonly, we're emitting the changes for the rest of the app
    tickRatio: number;
    emitTick: any;

    constructor(gameState: GameState, onTick: any) {
        this.saveClockId = setInterval(
            () => saveGame(gameState),
            30000
        );
        this.gameState = gameState;
        this.updateState(gameState);
        this.tickRatio = TICK_SPEED / 1000
        this.emitTick = onTick;
    }

    tick() {
        var newState = {...this.gameState};
        if(this.gameState.generators.relicGenerator) {
            newState.currencies.relics += this.gameState.generators.relicGenerator*this.tickRatio;
        }
        this.gameState = newState;
        this.emitTick(newState);
    }

    updateState(gameState: GameState) {
        clearInterval(this.resourceClockId);
        this.resourceClockId = setInterval(() => this.tick(), TICK_SPEED);
    }


}
