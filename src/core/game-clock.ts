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
        this.tickRatio = TICK_SPEED / 1000; // 50ms / 1000ms, multiply by how many per second you want
        this.maxTicks = (5 * 1000) / TICK_SPEED;
        this.emitTick = onTick;
    }

    tick() {
        // TODO: Tickcount, random event on tickcount
        var newState = {...this.gameState};
        if(this.gameState.jobAssignments.gatherRelics) {
            const relicsMultiplier = 1
                + (this.gameState.researchState.betterShovels ? .5 : 0);
            newState.resourceState.relics += this.gameState.jobAssignments.gatherRelics*.5*this.tickRatio*relicsMultiplier;
        }
        if(this.gameState.jobAssignments.studyRelics && this.gameState.resourceState.relics >= this.gameState.jobAssignments.gatherRelics*50*this.tickRatio) {
            newState.resourceState.relics -= this.gameState.jobAssignments.gatherRelics*50*this.tickRatio;
            newState.resourceState.knowledge += this.gameState.jobAssignments.gatherRelics*.5*this.tickRatio;
        }
        if(this.gameState.researchState.profiteering) {
            // Money accrual
            this.gameState.resourceState.money += .25*this.tickRatio;
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
