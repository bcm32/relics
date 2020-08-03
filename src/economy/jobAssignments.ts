import {GameState} from "../core/game-state";

// Gather
export function assignGatherers(amount: number, gameState: GameState){
    if(countAvailableStudents(gameState) >= amount) {
        gameState.jobAssignments.gatherRelics += amount;
    }
}
export function removeGatherers(amount: number, gameState: GameState){
    gameState.jobAssignments.gatherRelics -= amount;
    if(gameState.jobAssignments.gatherRelics < 0) gameState.jobAssignments.gatherRelics = 0;
}

// Study
export function assignStudyRelics(amount: number, gameState: GameState){
    if(countAvailableStudents(gameState) >= amount) {
        gameState.jobAssignments.studyRelics += amount;
    }
}
export function removeStudyRelics(amount: number, gameState: GameState){
    gameState.jobAssignments.studyRelics -= amount;
    if(gameState.jobAssignments.studyRelics < 0) gameState.jobAssignments.studyRelics = 0;
}

// Work the gift shop
export function assignGiftShop(amount: number, gameState: GameState){
    if(countAvailableStudents(gameState) >= amount) {
        gameState.jobAssignments.giftShop += amount;
    }
}
export function removeGiftShop(amount: number, gameState: GameState){
    gameState.jobAssignments.giftShop -= amount;
    if(gameState.jobAssignments.giftShop < 0) gameState.jobAssignments.studyRelics = 0;
}

export function countAvailableStudents(gameState: GameState) {
    const assignedStudents = (gameState.jobAssignments.gatherRelics || 0)
        + (gameState.jobAssignments.studyRelics || 0)
        + (gameState.jobAssignments.giftShop|| 0);
    return gameState.resourceState.students - assignedStudents;
}
