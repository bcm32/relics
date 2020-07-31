import {GameState} from "./game-state";
import {ACHIEVEMENT_ENTRY_TYPE, addDetailedJournalEntry} from "./journal";

export function labFirstUnlock(gameState: GameState) {
    if(!gameState.achievements.labUnlocked) {
        gameState.achievements.labUnlocked = true;
        addDetailedJournalEntry(gameState, {
            entry: "With your newfound stash of relics, you retreat to your personal labority!",
            entryType: ACHIEVEMENT_ENTRY_TYPE,
        });
    }
}
