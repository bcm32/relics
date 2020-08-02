import {saveGame} from "./saveService";
import {GameState} from "./game-state";
import {TICK_SPEED, SECONDS_PER_EVENT_CHECK, BASE_RELIC_CAP, BASE_MONEY_CAP} from "../config/constants";
import {randomEventsForDuration} from "./event-manager";

export class GameClock {
    saveClockId: any;
    resourceClockId: any;
    gameState: GameState; // Not readonly, we're emitting the changes for the rest of the app
    tickRatio: number; // Modified each pass of the clock so that we can deal with running in the background
    emitTick: any;
    maxTicks: number;
    lastTickDate: Date;
    randomEventTimer = 0;

    constructor(gameState: GameState, onTick: any) {
        this.saveClockId = setInterval(
            () => saveGame(gameState),
            30000
        );
        this.gameState = gameState;
        this.updateState(gameState);
        this.tickRatio = TICK_SPEED / 1000; // Default: 50ms / 1000ms, multiply by how many per second you want
        this.maxTicks = (5 * 1000) / TICK_SPEED;
        this.emitTick = onTick;
        this.lastTickDate = new Date(gameState.saveTime); //Easy offline progress solution?
    }

    private calibrate() {
        const tickTimeStamp = new Date();
        const seconds = (tickTimeStamp.getTime() - this.lastTickDate.getTime()) / 1000;
        this.lastTickDate = tickTimeStamp;
        this.tickRatio = seconds;
        this.randomEventTimer += seconds;
    }

    private manageRandomEvent(newState: GameState) {
        if(this.randomEventTimer >= SECONDS_PER_EVENT_CHECK ) {
            // every 5s, test for an event

            randomEventsForDuration(newState, Math.floor(this.randomEventTimer / SECONDS_PER_EVENT_CHECK));
            this.randomEventTimer = 0;
        }
    }

    tick() {
        this.calibrate();
        const newState = {...this.gameState};

        // Rates & Stats
        let relicsPerSecond = 0;
        let knowledgePerSecond = 0;
        let moneyPerSecond = 0;

        // Calculate rates and side effects
        if(this.gameState.jobAssignments.gatherRelics) {
            const relicsMultiplier = 1
                + (this.gameState.researchState.betterShovels ? .5 : 0);
            relicsPerSecond = this.gameState.jobAssignments.gatherRelics*.5*relicsMultiplier;
        }
        if(this.gameState.jobAssignments.studyRelics && this.gameState.resourceState.relics >= this.gameState.jobAssignments.gatherRelics*10*this.tickRatio) {
            const relicConsumptionRate = this.gameState.jobAssignments.studyRelics*10;
            relicsPerSecond -= relicConsumptionRate;
            knowledgePerSecond = this.gameState.jobAssignments.studyRelics*.1;
        }
        if(this.gameState.researchState.profiteering) {
            moneyPerSecond = .25;
            if(this.gameState.jobAssignments.giftShop) {
                moneyPerSecond += this.gameState.jobAssignments.giftShop*.125;
                relicsPerSecond -= this.gameState.jobAssignments.giftShop*2.5;
            }
        }

        // Apply rates to resources
        newState.resourceState.money     += moneyPerSecond      *this.tickRatio;
        newState.resourceState.relics    += relicsPerSecond     *this.tickRatio;
        newState.resourceState.knowledge += knowledgePerSecond  *this.tickRatio;

        // Apply caps
        const relicCap = BASE_RELIC_CAP + this.gameState.resourceState.sheds*50;
        if(newState.resourceState.relics >= relicCap) newState.resourceState.relics = relicCap;
        newState.resourceState.relicCap = relicCap;

        const moneyCap = BASE_MONEY_CAP;
        if(newState.resourceState.money >= moneyCap) newState.resourceState.money = moneyCap;
        newState.resourceState.moneyCap = BASE_MONEY_CAP;

        // Aggregate stats
        newState.resourceState.relicRate     = relicsPerSecond;
        newState.resourceState.moneyRate     = moneyPerSecond;
        newState.resourceState.knowledgeRate = knowledgePerSecond;

        // Kick off any events that have transpired
        this.manageRandomEvent(newState);

        // Save and output
        this.gameState = newState;
        this.emitTick(newState);
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
