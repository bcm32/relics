import {COMMON_ENTRY_TYPE, DetailedEntry} from "./journal";

export class GameState {
    resourceState: ResourceState = new ResourceState();
    jobAssignments: JobAssignments = new JobAssignments();
    journalState: JournalState = new JournalState();
    saveTime: Date = new Date();
    settings: SettingsState = new SettingsState();
    achievements: Achievements = new Achievements();
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
}

export class JournalState {
    entries: DetailedEntry[] = [{
        entry: "The new dig site lays before me, I wonder what treasures lay yet unearthed?",
        entryType: COMMON_ENTRY_TYPE
    }];
}

export class SettingsState {
    darkMode: boolean = false;
}

export class Achievements {
    labUnlocked: boolean = false;
}
