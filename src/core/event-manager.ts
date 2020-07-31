import {GameState} from "./game-state";
import {addDetailedJournalEntry, addJournalEntry, BLOOD_ENTRY_TYPE} from "./journal";
import {countAvailableStudents, removeGatherers, removeStudyRelics} from "../economy/jobAssignments";

export function randomEvent(gameState: GameState) {
    const diceRoll = roll1d100();
    if(diceRoll >= 95) {
        addJournalEntry(gameState, "The wind blows across the dusty plain");
    }
    if( 10 <= diceRoll && diceRoll <= 15) {
        addJournalEntry(gameState, "A stranger shuffles up and hands something to you: +100 Relics!");
        gameState.resourceState.relics += 100
    }
    if(diceRoll === 1 && gameState.resourceState.students > 2) {
        // A dark event occurs
        if(countAvailableStudents(gameState) <= 0) {
            if(gameState.jobAssignments.gatherRelics >= 1) {
                removeGatherers(1, gameState);
            } else if (gameState.jobAssignments.studyRelics >= 1) {
                removeStudyRelics(1, gameState);
            }
        }
        gameState.resourceState.blood ? gameState.resourceState.blood++ : gameState.resourceState.blood = 1;
        gameState.resourceState.students -= 1;

        addDetailedJournalEntry(gameState, {
            entry: "You are short one student.",
            entryType: BLOOD_ENTRY_TYPE,
        });
    }
}

function roll1d100() {
    return Math.floor(Math.random() * 100 + 1);
}
