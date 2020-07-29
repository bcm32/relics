export class GameState {
    currencies: CurrencyState = new CurrencyState();
    generators: GeneratorState = new GeneratorState();
    journalState: JournalState = new JournalState();
    saveTime: Date = new Date();
}

export class CurrencyState {
    relics: number = 0;
}

export class GeneratorState {
    relicGenerator: number = 0;
}

export class JournalState {
    entries: string[] = ["Where am I?"];
}
