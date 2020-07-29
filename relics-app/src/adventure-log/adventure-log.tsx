import * as React from "react";

type LogProps = {
    name: string
}

export class AdventureLog extends React.Component<LogProps> {

    getStory() {
        return `These dusty relics are probably worth something!...`
    }


    render() {
        return (
            <h1>{this.getStory()}</h1>
        );
    }
}
