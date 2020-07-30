import * as React from "react";
import {GameState} from "../core/game-state";

type LogProps = {
    gameState: GameState
}

export class Header extends React.Component<LogProps> {

    getStory() {
        return `These dusty relics are probably worth something!`
    }


    render() {
        return (
            <h1>{this.getStory()}</h1>
        );
    }
}
