import {CSSProperties} from "react";

export const MS_TO_IN_GAME_DAYS = 2*1000;

export const MOON_ROTATION_DAYS = 27;
export const SOLAR_YEAR_DAYS = 356;
export const CHART_RADIUS = 30;
export const EARTH_DAY = 1;

export function getDayNumber(msElapsed: number) {
  return msElapsed / MS_TO_IN_GAME_DAYS;
}

export function getCalendarDay(msElapsed: number) {
    const day = (getDayNumber(msElapsed)%SOLAR_YEAR_DAYS).toFixed();
    const year = (getDayNumber(msElapsed)/SOLAR_YEAR_DAYS).toFixed();
    return `Day ${day}, Year ${year}`
}

export function getSeason(sunClockPosition: number) {
    if(sunClockPosition <= 3) {
        return "🏵";
    } else if(sunClockPosition <= 6) {
        return "☼";
    } else if(sunClockPosition <= 9) {
        return "🙐";
    }
    return "❄";
}

// Positions START aligned, for now.
export function getSunPosition(msElapsed: number) {
    const sunLocation = (getDayNumber(msElapsed)%SOLAR_YEAR_DAYS)/SOLAR_YEAR_DAYS;
    return sunLocation * 12;
}

export function getMoonPosition(msElapsed: number) {
    const moonLocation = (getDayNumber(msElapsed)%MOON_ROTATION_DAYS)/MOON_ROTATION_DAYS;
    return moonLocation * 12;
}

export function getMoonStyles(msElapsed: number):CSSProperties {
    return getCelestialBodyStyles(msElapsed, MOON_ROTATION_DAYS, 5, 10, 1.4);
}

export function getSunStyles(msElapsed: number):CSSProperties {
    return getCelestialBodyStyles(msElapsed, SOLAR_YEAR_DAYS, 5, 30, 1.6);
}

export function getBaseStyles(msElapsed: number):CSSProperties {
    return getCelestialBodyStyles(msElapsed, EARTH_DAY, 5, 55, 0.7);
}

export function getCelestialBodyStyles(msElapsed: number, orbitTime: number, offsetX = 0, offsetY = 0, multiplier=1):CSSProperties {
    const s = (getDayNumber(msElapsed)%orbitTime)/orbitTime*2*Math.PI;
    const x = (CHART_RADIUS + Math.cos(s) * CHART_RADIUS)*multiplier - (CHART_RADIUS*multiplier - CHART_RADIUS) - offsetX;
    const y = (CHART_RADIUS + Math.sin(s) * CHART_RADIUS)*multiplier - (CHART_RADIUS*multiplier - CHART_RADIUS) - offsetY;
    return {
        position: "relative",
        top: y.toFixed() + "px",
        left: x.toFixed() + "px"
    };
}
