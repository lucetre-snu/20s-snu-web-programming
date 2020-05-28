import React, { useState } from 'react';
import './App.css';

function Car({name, speed, owner, ...props}) {
  const keys = Object.keys(props);
  return (
    <div>
      <h3> {name} - {owner} </h3>
      <h6> speed: {speed} </h6>
      {keys.map(key => <p> {key} : {props[key]}</p>)}
    </div>
  )
}

function App() {
  const UserJsx = <div>I'm Son</div>
  const _fruits = ['apple', 'banana', 'kiwi'];
  let [count, setCount] = useState(0);
  let [fruits, setFruits] = useState(_fruits);
  let [input, setInput] = useState('');

  const addFruit = () => {
    setFruits([...fruits, input]);
    setInput('');
  };
  
  return (
    <div className="App">
      <h1>Hello Grocery</h1>
      { UserJsx }
      { UserJsx }
      { UserJsx }
      <ul>
        { fruits.map(fruit => <li>{fruit}</li>) }
      </ul>

      <label>fruit name: <input type="text" value={input} onChange={e => setInput(e.target.value)}/></label>
      <button onClick={addFruit}>Add Fruit</button>
      <br />
      <button onClick={() => setFruits([])}>Reset</button>
      <h3>Fruits : { fruits.length }</h3>

      <Car name="Son" speed="13" owner="Me" else="dkfl" />
      <Car name="Jin" speed="19" owner="Us" else="jklfasjs" />
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default App;
