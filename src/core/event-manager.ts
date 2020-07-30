import {GameState} from "./game-state";
import {addJournalEntry} from "../adventure-log/journal";

export function randomEvent(gameState: GameState) {
    const diceRoll = roll1d100();
    console.log(diceRoll);
    if(diceRoll >= 95) {
        addJournalEntry(gameState, "The wind blows across the dusty plain")
    }
    if( 10 <= diceRoll && diceRoll <= 15) {
        addJournalEntry(gameState, "A stranger shuffles up and hands something to you: +100 Relics!")
        gameState.currencies.relics += 100
    }
}

function roll1d100() {
    return Math.floor(Math.random() * 100 + 1);
}