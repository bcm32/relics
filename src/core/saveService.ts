import {GameState, mergeStateWithDefault} from "./game-state";
import {addJournalEntry} from "./journal";

export function saveGameExists() {
    return !!localStorage.getItem("RelicsSave");
}

export function loadSave() {
    const string = localStorage.getItem("RelicsSave");
    const save =  string ? JSON.parse(atob(string)) : null;
    return mergeStateWithDefault(save);
}

export function newSave(): GameState {
    return new GameState();
}

export function saveGame(gameState: GameState, manualSave: boolean = false) {
    gameState.saveTime = new Date();
    if(manualSave) addJournalEntry(gameState, "Game Saved");
    localStorage.setItem("RelicsSave", btoa(JSON.stringify(gameState)));
}


export function exportSave(gameState: GameState) {
    saveGame(gameState);
    // TODO: export
}

export function importSave(gameState: GameState) {
    saveGame(gameState);
    // TODO: import
}
