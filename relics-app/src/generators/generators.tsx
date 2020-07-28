import * as React from "react";

type GeneratorProps = {}
type GeneratorState = {
    relics: number
}

export class Generators extends React.Component<GeneratorProps, GeneratorState> {
    constructor(props: GeneratorProps) {
        super(props);
        this.state = {relics: 0}
    }
    relicHunt() {
        this.setState({
            relics: this.state.relics + 1
        })
    }

    render() {
        return (
            <div>
                <button onClick={() => this.relicHunt()}>Look for relics</button>
                <br/>
                <p>You have ${this.state.relics} relics</p>
            </div>
        );
    }
}
