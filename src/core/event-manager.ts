import {GameState} from "./game-state";
import {addDetailedJournalEntry, addJournalEntry, BLOOD_ENTRY_TYPE} from "./journal";
import {countAvailableStudents, removeGatherers, removeGiftShop, removeStudyRelics} from "../economy/jobAssignments";
import {safeResource} from "../economy/Transaction";
import {formatRateNumber} from "../shared/formatNumbers";

export function randomEventsForDuration(gameState: GameState, amount: number) {
    for (let i = 0; i < amount; i++) {
        randomEvent(gameState);
    }
}

export function randomEvent(gameState: GameState) {
    const diceRoll = roll1d100();
    if(diceRoll >= 95) {
        addJournalEntry(gameState, "The wind blows across the dusty plain");
    }
    if( 10 < diceRoll && diceRoll <= 15) {
        addJournalEntry(gameState, "A stranger shuffles up and hands something to you: +100 Relics!");
        gameState.resourceState.relics += 100
    }

    let dreadEventChance = Math.log10(gameState.resourceState.blood);
    if(dreadEventChance > 10) dreadEventChance = 10;
    if(dreadEventChance < 1) dreadEventChance = 1;
    console.log(dreadEventChance, " & ", diceRoll)
    if(diceRoll <= dreadEventChance && gameState.resourceState.students > 2) {
        // A dark event occurs, protect with blood
        // Mitigate risk & loss
        const bloodLoss = Math.max(gameState.resourceState.blood*.8, 1);
        if(gameState.researchState.bloodWard && gameState.resourceState.blood >= bloodLoss) {
            gameState.resourceState.blood = safeResource(gameState.resourceState.blood) - bloodLoss;
            addDetailedJournalEntry(gameState, {
                entry: `The ward protects the student in exchange for ${bloodLoss.toFixed()} blood.`,
                entryType: BLOOD_ENTRY_TYPE,
            });
        }
        else  {
            if (countAvailableStudents(gameState) <= 0) {
                if (gameState.jobAssignments.gatherRelics >= 1) {
                    removeGatherers(1, gameState);
                } else if (gameState.jobAssignments.studyRelics >= 1) {
                    removeStudyRelics(1, gameState);
                } else if (gameState.jobAssignments.studyRelics >= 1) {
                    removeGiftShop(1, gameState);
                }
            }
            gameState.resourceState.blood = safeResource(gameState.resourceState.blood) + 1;
            gameState.resourceState.students -= 1;

            addDetailedJournalEntry(gameState, {
                entry: "A shout in the dark. You are short one student.",
                entryType: BLOOD_ENTRY_TYPE,
            });
        }
    }
}

function roll1d100() {
    return Math.floor(Math.random() * 100 + 1);
}
