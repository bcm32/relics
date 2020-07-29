export class GameState {
    currencies: CurrencyState = new CurrencyState();
    generators: GeneratorState = new GeneratorState();
    saveTime: Date = new Date();
}

export class CurrencyState {
    relics: number = 0;
}

export class GeneratorState {
    relicGenerator: number = 0;
}
