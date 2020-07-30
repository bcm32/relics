import * as React from "react";
import {JournalState} from "../core/game-state";

type JournalProps = {
    journalState: JournalState,
    clearLog: any
}

export class AdventureLog extends React.Component<JournalProps> {

    getStory() {
        return `These dusty relics are probably worth something!`
    }

    render() {
        const { journalState, clearLog } = this.props;
        const entryList = journalState.entries.map((entry) =>
            <p>{entry}</p>
        );
        return (
            <div>
                <button onClick={() => clearLog()}>Clear Log</button>
                <div>{entryList}</div>
            </div>
        );
    }
}
