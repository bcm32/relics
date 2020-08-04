import ReactMarkdown from "react-markdown";
import React from "react";


export class PatchNotePanel extends React.Component {
   render() {
        const input = '# Patch Notes\n' +
            '\n' +
            '## Version 0.1.1:\n' +
            'Basic build of the game and component interactions. Added scaffolding for versions.\n';

        return (
            <ReactMarkdown source={input} />
        );
    }
}
