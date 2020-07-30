import {saveGame} from "./saveService";
import {GameState} from "./game-state";
import {TICK_SPEED} from "../config/constants";
import {randomEvent} from "./event-manager";

export class GameClock {
    saveClockId: any;
    resourceClockId: any;
    gameState: GameState; // Not readonly, we're emitting the changes for the rest of the app
    tickRatio: number;
    emitTick: any;
    maxTicks: number;
    tickNumber: number = 0;

    constructor(gameState: GameState, onTick: any) {
        this.saveClockId = setInterval(
            () => saveGame(gameState),
            30000
        );
        this.gameState = gameState;
        this.updateState(gameState);
        this.tickRatio = TICK_SPEED / 1000;
        this.maxTicks = (5 * 1000) / TICK_SPEED;
        this.emitTick = onTick;
    }

    tick() {
        // TODO: Tickcount, random event on tickcount
        var newState = {...this.gameState};
        if(this.gameState.jobAssignments.gatherRelics) {
            newState.resourceState.relics += this.gameState.jobAssignments.gatherRelics*this.tickRatio;
        }

        if(this.tickNumber >= this.maxTicks ) {
            // every 5s, test for an event
            randomEvent(newState);
            this.tickNumber = 1;
        }
        this.gameState = newState;
        this.emitTick(newState);
        this.tickNumber++;
    }

    updateState(gameState: GameState) {
        clearInterval(this.resourceClockId);
        this.resourceClockId = setInterval(() => this.tick(), TICK_SPEED);
    }

    clearClock() {
        clearInterval(this.resourceClockId);
        clearInterval(this.saveClockId);
    }

}
