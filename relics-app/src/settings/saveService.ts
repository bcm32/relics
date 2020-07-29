import {GameState} from "./game-state";

export function saveGameExists() {
    return !!localStorage.getItem("RelicsSave");
}

export function loadSave() {
    const string = localStorage.getItem("RelicsSave");
    const save =  string ? JSON.parse(atob(string)) : null;
    const merged = {...new GameState(), ...save};
    return merged;
}

export function newSave() {
    return new GameState();
}

export function saveGame(gameState: GameState) {
    localStorage.setItem("RelicsSave", btoa(JSON.stringify(gameState)));
}

export function exportSave(gameState: GameState) {
    saveGame(gameState);
    // TODO: export
}
