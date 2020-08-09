import {COMMON_ENTRY_TYPE, DetailedEntry} from "./journal";
import {CURRENT_VERSION} from "../config/versioning";

export class GameState {
    resourceState: ResourceState = new ResourceState();
    jobAssignments: JobAssignments = new JobAssignments();
    journalState: JournalState = new JournalState();
    settings: SettingsState = new SettingsState();
    achievements: Achievements = new Achievements();
    researchState: ResearchState = new ResearchState();
    saveTime: Date = new Date();
    runStartTime: Date = new Date();
    version: string = CURRENT_VERSION;
}

export class ResourceState {
    relics: number = 0;
    relicCap: number = 0;
    relicRate: number = 0;
    relicGenerator: number = 0;
    sheds: number = 0;
    students: number = 0;
    knowledge: number = 0;
    knowledgeRate: number = 0;
    knowledgeCap: number = 0;
    blood: number = 0;
    bloodRate: number = 0;
    bloodLoss: number = 0;
    bloodChance: number = 0;
    money: number = 0;
    moneyRate = 0;
    moneyCap = 0;
    banks = 0;
    bleedingStones = 0;
    fame: number = 0;
    whispers: number = 0;
}

export class JobAssignments {
    gatherRelics: number = 0;
    studyRelics: number = 0;
    giftShop: number = 0;
}

export class JournalState {
    entries: DetailedEntry[] = [{
        id: Math.random(),
        entry: "The new dig site lays before me, I wonder what treasures lay yet unearthed?",
        entryType: COMMON_ENTRY_TYPE,
    }];
}

export class SettingsState {
    darkMode: boolean = true;
}

export class Achievements {
    labUnlocked: boolean = false;
}

export class ResearchState {
    banksOpen: boolean = false;
    studentKnowledge: boolean = false;
    profiteering: boolean = false;
    betterShovels: boolean = false;
    bloodWard: boolean = false;
    bloodMeter: boolean = false;
    mapTheGrounds: boolean = false;
    tours: boolean = false;
    ritualCircle: boolean = false;
    searchAlgorithms: boolean = false;
}

export function mergeStateWithDefault(gameState: GameState): GameState {
    const newState = {...new GameState(), ...gameState};
    newState.resourceState = {...newState.resourceState, ...gameState.resourceState};
    newState.jobAssignments = {...newState.jobAssignments, ...gameState.jobAssignments};
    newState.journalState = {...newState.journalState, ...gameState.journalState};
    newState.saveTime = gameState.saveTime;
    newState.settings = {...newState.settings, ...gameState.settings};
    newState.achievements = {...newState.achievements, ...gameState.achievements};
    newState.researchState = {...newState.researchState, ...gameState.researchState};
    newState.runStartTime = newState.runStartTime ? newState.runStartTime : new Date();
    return newState;
}
