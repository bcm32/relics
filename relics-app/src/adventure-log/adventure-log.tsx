import * as React from "react";

type LogProps = {
    name: string
}

export class AdventureLog extends React.Component<LogProps> {

    getStory() {
        return `${this.props.name} walks along a dusty road...`
    }


    render() {
        return (
            <h1>{this.getStory()}</h1>
        );
    }
}
