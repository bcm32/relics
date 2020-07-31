import {GameState} from "../core/game-state";

export function assignGatherers(amount: number, gameState: GameState){
    // Cache available in the future?
    if(countAvailableStudents(gameState) >= amount) {
        gameState.jobAssignments.gatherRelics += amount;
    }
}

export function removeGatherers(amount: number, gameState: GameState){
    // Cache available in the future?
    gameState.jobAssignments.gatherRelics -= amount;
    if(gameState.jobAssignments.gatherRelics < 0) gameState.jobAssignments.gatherRelics = 0;
}

export function assignStudyRelics(amount: number, gameState: GameState){
    // Cache available in the future?
    console.log(gameState)
    if(countAvailableStudents(gameState) >= amount) {
        gameState.jobAssignments.studyRelics += amount;
    }
}

export function removeStudyRelics(amount: number, gameState: GameState){
    // Cache available in the future?
    gameState.jobAssignments.studyRelics -= amount;
    if(gameState.jobAssignments.studyRelics < 0) gameState.jobAssignments.studyRelics = 0;
}

export function countAvailableStudents(gameState: GameState) {
    const assignedStudents = (gameState.jobAssignments.gatherRelics || 0)
        + (gameState.jobAssignments.studyRelics || 0);
    return gameState.resourceState.students - assignedStudents;
}
