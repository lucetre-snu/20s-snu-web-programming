import React from 'react';
import logo from './logo.svg';
import HelloDiv from './HelloDiv.js';
import './App.css';

const people = [
  {name: 'Bob', height: 165},
  {name: '1', height: 165},
  {name: '2', height: 165},
  {name: '3', height: 165},
  {name: '4', height: 165},
];

function App() {
  const HelloDiv1 = <div>Hello!</div>;
  const fruits = ['apple', 'banana', 'kiwi'];
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        {HelloDiv1}
        {HelloDiv1}
        {HelloDiv1}

        <HelloDiv name='Bob' height="123" a="a"/>
        <HelloDiv name='1' height="123"/>
        <HelloDiv name='2'/>
        <HelloDiv name='3'/>

        {people.map(person => <HelloDiv {...person} />)}
        
        <ul>
        {
          fruits.map(fruit => <li key={fruit}>{fruit}</li>)
        }
        </ul>
      </header>
    </div>
  );
}

export default App;
