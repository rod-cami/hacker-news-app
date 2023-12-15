import { useState } from 'react';
import './App.css';
import Combo from './components/Combo';

function App() {

  const [sindex, setSindex] = useState(-1);

  const selectedIndex = (index) => {
    setSindex(index);
  };

  const showIndex = () => {
    alert("Selected index: " + sindex)
  }

  return (
    <div className="App">
      <Combo text='Select an option' itemSelectedEvent={selectedIndex} startIndex="0"/>
      <button onClick={showIndex}>Consult selected index</button>
    </div>

  );
}

export default App;
