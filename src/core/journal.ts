import {GameState} from "./game-state";
import {MAX_LOG_SIZE} from "../config/constants";

export const ACHIEVEMENT_ENTRY_TYPE = "ACHIEVEMENT";
export const COMMON_ENTRY_TYPE = "COMMON";

export type DetailedEntry = {
    entry: string,
    entryType: string,
}

export function addJournalEntry(gameState: GameState, entry: string){
    gameState.journalState.entries.push({
        entry: entry,
        entryType: COMMON_ENTRY_TYPE
    });
    if(gameState.journalState.entries.length >= MAX_LOG_SIZE) {
        gameState.journalState.entries.shift();
    }
    return gameState;
}

export function addDetailedJournalEntry(gameState: GameState, entry: DetailedEntry){
    gameState.journalState.entries.push(entry);
    if(gameState.journalState.entries.length >= MAX_LOG_SIZE) {
        gameState.journalState.entries.shift();
    }
    return gameState;
}

export function clearJournal(gameState: GameState) {
    gameState.journalState.entries = [];
}
