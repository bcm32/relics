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
    money: number = 0;
}

export class JobAssignments {
    gatherRelics: number = 0;
}

export class JournalState {
    entries: string[] = ["Where am I?"];
}

export class SettingsState {
    darkMode: boolean = false;
}

export class Achievements {

}