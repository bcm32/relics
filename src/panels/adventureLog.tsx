import * as React from "react";
import {JournalState} from "../core/game-state";
import {RelicsButton} from "../shared/relicsButton";

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
        const entryList = journalState.entries.reverse().map((entry) =>
            <div className="padded-text journal__entry">{entry}</div>
        );
        return (
            <div className="panel--left-align journal-panel">
                <RelicsButton onClick={() => clearLog()}>Clear Log</RelicsButton>
                <div className="journal">{entryList}</div>
            </div>
        );
    }
}
