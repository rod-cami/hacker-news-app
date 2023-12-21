import { useState } from 'react';
import './App.css';
import Combo from './components/Combo';
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import MainComponent from "./components/MainComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [activeTab, setActiveTab] = useState('Alls');
  return (
    <div className="App">
      <Header/>
      {/* <Combo text='Select an option' itemSelectedEvent={selectedIndex} startIndex="0"/>
      <button onClick={showIndex}>Consult selected index</button> */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Router>
        <Routes>
          <Route path="/" element={<MainComponent activeTab={activeTab}/>}/>
        </Routes>
      </Router>
    </div>

  );
}

export default App;
