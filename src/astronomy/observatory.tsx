import React, {CSSProperties} from "react";
import {GameState} from "../core/game-state";
import {
    getMoonPosition,
    getMoonStyles,
    getSunPosition, getSunStyles,
    MOON_ROTATION_DAYS,
    MS_TO_IN_GAME_DAYS
} from "./observatoryMath";

type AstronomyState = {
    gameState: GameState;
}

export class Observatory extends React.Component<AstronomyState> {
    runStartTime: Date;
    constructor(props: AstronomyState) {
        super(props);
        this.runStartTime = new Date(props.gameState.runStartTime);
    }

    render() {
        const msElapsed =  new Date().getTime() - this.runStartTime.getTime();
        const dayNumber = msElapsed / MS_TO_IN_GAME_DAYS;

        return (<div style={{position: "absolute"}}>
            Star Chart - Day {dayNumber.toFixed()}
            {/*Day {dayNumber.toFixed(2)}*/}
            {/*<br/>{getSunPosition(msElapsed).toFixed(2)}*/}
            {/*<br/>{getMoonPosition(msElapsed).toFixed(2)}*/}
            <div className="star-chart">
                <div className="star-chart__moon" style={getMoonStyles(msElapsed)}>☽</div>
                <div className="star-chart__sun" style={getSunStyles(msElapsed)}>☼</div>
            </div>
        </div>)
    }
}