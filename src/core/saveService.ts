import {GameState, mergeStateWithDefault} from "./game-state";
import {addJournalEntry} from "./journal";

export function saveGameExists() {
    return !!localStorage.getItem("RelicsSave");
}

export function loadSave() {
    const string = localStorage.getItem("RelicsSave");
    return loadSaveFromString(string);
}

function loadSaveFromString(string: string | null) {
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


export function importSave(): GameState | null {
    const importText  = prompt("Import Save", "");

    if (importText == null || importText === "") {
        return null;
    } else {
        // Try to parse
        return loadSaveFromString(importText);
    }}

export function exportSave(gameState: GameState): string {
    saveGame(gameState);
    return btoa(JSON.stringify(gameState));
}
