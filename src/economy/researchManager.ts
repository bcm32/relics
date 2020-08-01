import {GameState} from "../core/game-state";
import {Research, Transaction} from "./Transaction";
import {BetterShovels} from "./research/betterShovels";
import {BloodWard} from "./research/bloodWard";
import {Profit} from "./research/profit";
import {StudentKnowledge} from "./research/studentKnowledge";

export const allResearches: typeof Research[] = [
    BetterShovels,
    BloodWard,
    Profit,
    StudentKnowledge
];

export function getAvailableResearches(gameState: GameState): typeof Research[] {
    return allResearches.filter((r) => r.isAvailable(gameState));
}