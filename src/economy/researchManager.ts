import {GameState} from "../core/game-state";
import {Research} from "./Transaction";
import {BetterShovels} from "./research/betterShovels";
import {BloodWard} from "./research/bloodWard";
import {Profit} from "./research/profit";
import {StudentKnowledge} from "./research/studentKnowledge";
import {MapTheRuins} from "./research/mapTheRuins";
import {Tours} from "./research/tours";
import {Banks} from "./research/banks";
import {RitualCircle} from "./research/ritualCircle";
import {SearchAlgorithms} from "./research/searchAlgorithms";
import {BloodMeter} from "./research/bloodMeter";

export const allResearches: typeof Research[] = [
    BetterShovels,
    BloodWard,
    Profit,
    StudentKnowledge,
    MapTheRuins,
    Tours,
    Banks,
    RitualCircle,
    SearchAlgorithms,
    BloodMeter
];

export function getAvailableResearches(gameState: GameState): typeof Research[] {
    return allResearches.filter((r) => r.isAvailable(gameState));
}
