import {COMMON_ENTRY_TYPE, DetailedEntry} from "./journal";

export class GameState {
    resourceState: ResourceState = new ResourceState();
    jobAssignments: JobAssignments = new JobAssignments();
    journalState: JournalState = new JournalState();
    saveTime: Date = new Date();
    settings: SettingsState = new SettingsState();
    achievements: Achievements = new Achievements();
    researchState: ResearchState = new ResearchState();
}

export class ResourceState {
    relics: number = 0;
    relicGenerator: number = 0;
    students: number = 0;
    knowledge: number = 0;
    blood: number = 0;
    money: number = 0;
    fame: number = 0;
    whispers: number = 0;
}

export class JobAssignments {
    gatherRelics: number = 0;
    studyRelics: number = 0;
}

export class JournalState {
    entries: DetailedEntry[] = [{
        entry: "The new dig site lays before me, I wonder what treasures lay yet unearthed?",
        entryType: COMMON_ENTRY_TYPE
    }];
}

export class SettingsState {
    darkMode: boolean = true;
}

export class Achievements {
    labUnlocked: boolean = false;
}

export class ResearchState {
    studentKnowledge: boolean = false;
    profiteering: boolean = false;
    betterShovels: boolean = false;
    bloodWard: boolean = false;
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

    return newState;
}
