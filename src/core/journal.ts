import {GameState} from "./game-state";
import {MAX_LOG_SIZE} from "../config/constants";

export const ACHIEVEMENT_ENTRY_TYPE = "ACHIEVEMENT";
export const COMMON_ENTRY_TYPE = "COMMON";
export const BLOOD_ENTRY_TYPE = "BLOOD";

export type DetailedEntry = {
    entry: string,
    entryType: string,
    id: number
}

export type DetailedEntryInput = {
    entry: string,
    entryType: string,
    id?: number
}

export function addJournalEntry(gameState: GameState, entry: string){
    gameState.journalState.entries.push({
        entry: entry,
        entryType: COMMON_ENTRY_TYPE,
        id: Math.random()
    });
    if(gameState.journalState.entries.length >= MAX_LOG_SIZE) {
        gameState.journalState.entries.shift();
    }
    return gameState;
}

export function addDetailedJournalEntry(gameState: GameState, entry: DetailedEntryInput){
    if(!entry.id) {
        entry.id = Math.random();
    }
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    gameState.journalState.entries.push(<DetailedEntry>entry);
    if(gameState.journalState.entries.length >= MAX_LOG_SIZE) {
        gameState.journalState.entries.shift();
    }
    return gameState;
}

export function clearJournal(gameState: GameState) {
    gameState.journalState.entries = [];
}
