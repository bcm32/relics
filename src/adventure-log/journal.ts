import {GameState} from "../core/game-state";
import {MAX_LOG_SIZE} from "../config/constants";

export function addJournalEntry(gameState: GameState, entry: string){
    gameState.journalState.entries.push(entry);
    if(gameState.journalState.entries.length >= MAX_LOG_SIZE) {
        gameState.journalState.entries.shift();
    }
    return gameState;
}

export function clearJournal(gameState: GameState) {
    gameState.journalState.entries = [];
}