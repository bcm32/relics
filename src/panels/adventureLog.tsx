import * as React from "react";
import {JournalState} from "../core/game-state";
import {RelicsButton} from "../shared/relicsButton";
import {ACHIEVEMENT_ENTRY_TYPE, BLOOD_ENTRY_TYPE, COMMON_ENTRY_TYPE, DetailedEntry} from "../core/journal";

type JournalProps = {
    journalState: JournalState,
    clearLog: any
}

export class AdventureLog extends React.Component<JournalProps> {
    getClassName(entry: DetailedEntry) {
        let className = "padded-text journal__entry";
        switch (entry.entryType) {
            case ACHIEVEMENT_ENTRY_TYPE:
                className += " journal__entry--achievement";
                break;
            case BLOOD_ENTRY_TYPE:
                className += " blood-text";
                break;
            case COMMON_ENTRY_TYPE:
            default:
        }
        return className;
    }

    render() {
        const { journalState, clearLog } = this.props;
        const entryList = journalState.entries.slice(0).reverse().map((entry) =>
            <div key={entry.id} className={this.getClassName(entry)}>
                {entry.entry}
            </div>
        );
        return (
            <div className="panel--left-align journal-panel">
                <div className="button-container">
                    <RelicsButton onClick={() => clearLog()}>Clear Log</RelicsButton>
                </div>
                <div className="journal">{entryList}</div>
            </div>
        );
    }
}
