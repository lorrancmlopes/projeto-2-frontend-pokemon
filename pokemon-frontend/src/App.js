import { BrowserRouter as Router , Route, Routes  } from "react-router-dom";
import './App.css';

import LoginOrRegister from './components/LoginOrRegister/index.js'
import Home from './components/Home/index.js'
import Menu from './components/Menu/index.js'
import MyPokemons from "./components/MyPokemons";

function App() {
  return (
    <div className="App">
      <Router>  
        <Routes >
        <Route exact path="/home" element={<Home/>}/>
          <Route exact path="/login" element={<LoginOrRegister/>}/>
          <Route exact path="/register" element={<LoginOrRegister/>}/>
          <Route exact path="/menu" element={<Menu/>}/>
          <Route exact path="/pokemons" element={<MyPokemons/>}/>
        </Routes >
      </Router>
    </div>
  );
}

export default App;