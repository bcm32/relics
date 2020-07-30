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

export function countAvailableStudents(gameState: GameState) {
    const assignedStudents = gameState.jobAssignments.gatherRelics;
    return gameState.resourceState.students - assignedStudents;
}