import React from 'react';
import logo from './logo.svg';
import './App.css';
import {AdventureLog} from "./adventure-log/adventure-log";
import {Generators} from "./generators/generators";

function App() {
return (
    <div className="App">
        <header className="App-header">
            <AdventureLog name="Adventurer"/>
        </header>
        <Generators/>
    </div>
);
}

export default App;
