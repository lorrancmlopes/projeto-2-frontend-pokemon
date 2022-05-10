import { BrowserRouter as Router , Route, Routes  } from "react-router-dom";
import './App.css';

import LoginOrRegister from './components/LoginOrRegister/loginRegister'
import Home from './components/Home/home.js'
import Menu from './components/Menu/index.js'
import Game from './components/Game/game.js';

function App() {
  return (
    <div className="App">
      <Router>  
        <Routes >
        <Route exact path="/home" element={<Home/>}/>
          <Route exact path="/login" element={<LoginOrRegister/>}/>
          <Route exact path="/register" element={<LoginOrRegister/>}/>
          <Route exact path="/menu" element={<Menu/>}/>
          <Route exact path="/game" element={<Game/>}/>
        </Routes >
      </Router>
    </div>
  );
}

export default App;