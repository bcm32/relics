import React, {CSSProperties} from "react";
import {GameState} from "../core/game-state";
import {
    getBaseStyles,
    getMoonPosition,
    getMoonStyles,
    getSunPosition, getSunStyles,
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
        const sunClockPosition = getSunPosition(msElapsed);
        const moonClockPosition = getMoonPosition(msElapsed);
        const sunMoonDiff = Math.abs(sunClockPosition - moonClockPosition);

        let moonClass = "star-chart__moon ";
        if(5.5 < sunMoonDiff && sunMoonDiff < 6.5) moonClass += "blood-moon";
        let sunClass = "star-chart__sun ";
        if(sunMoonDiff <= 1 || sunMoonDiff >= 11) sunClass += "solar-eclipse";

        return (
            <div style={{position: "absolute"}}>
                Star Chart - Day {dayNumber.toFixed()}
                <div className="star-chart">
                    <div className={moonClass}
                         style={getMoonStyles(msElapsed)}>☽</div>
                    <div className={sunClass}
                         style={getSunStyles(msElapsed)}>☼</div>
                    {/*<div className="star-chart__base"*/}
                    {/*     style={getBaseStyles(msElapsed)}>x</div>*/}
                </div>
                <div className="outline-container star-chart__legend">
                    Moon: ☽
                    <br/>Sun: ☼
                    {/*<br/>Dig Site: x*/}
                </div>
            </div>)
    }
}
