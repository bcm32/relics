import * as React from "react";
import {JournalState} from "../core/game-state";

type JournalProps = {
    journalState: JournalState
}

export class AdventureLog extends React.Component<JournalProps> {

    getStory() {
        return `These dusty relics are probably worth something!`
    }

    render() {
        const { entries } = this.props.journalState;
        const entryList = entries.map((entry) =>
            <li>{entry}</li>
        );
        return (
            <ul>{entryList}</ul>
        );
    }
}
