import {GameState} from "./game-state";
import {addJournalEntry} from "./journal";

export function randomEvent(gameState: GameState) {
    const diceRoll = roll1d100();
    if(diceRoll >= 95) {
        addJournalEntry(gameState, "The wind blows across the dusty plain")
    }
}

function roll1d100() {
    return Math.floor(Math.random() * 100 + 1);
}