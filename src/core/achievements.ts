import {GameState} from "./game-state";
import {ACHIEVEMENT_ENTRY_TYPE, addDetailedJournalEntry} from "./journal";

export function labFirstUnlock(gameState: GameState) {
    if(!gameState.achievements.labUnlocked) {
        gameState.achievements.labUnlocked = true;
        addDetailedJournalEntry(gameState, {
            entry: "With your new found stash of relics, you retreat to your personal laboratory!",
            entryType: ACHIEVEMENT_ENTRY_TYPE,
        });
    }
}
