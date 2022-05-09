import  React , { useState , useEffect } from "react";
import './game.css' ;
import logo from "../../logo.png";
import map1 from "./sprites/map1.png";
import map2 from "./sprites/map2.png";
import map3 from "./sprites/map3.png";
import persona from "./sprites/persona.png";

function Game(){

    let easy_pokemons = ['rattata','cubat','pidgey'];

    let [left , setLeft] = useState(0);
    let [right , setRight] = useState(0);
    let [bottom , setBottom] = useState(0);
    let [top , setTop] = useState(0);

    const handleKey = (event) => {
        event.preventDefault();  
        if ((event.key == 'ArrowDown' || event.key == 's')) {
            console.log("Baixo")
            setTop(top+5)
          }

        if ((event.key == 'ArrowUp' || event.key == 'w')) {
            console.log("Cima")
            setBottom(bottom+5)
        }
        if ((event.key == 'ArrowLeft' || event.key == 'a')) {
            console.log("Esquerda")
            setRight(right+5)
        }
        if ((event.key == 'ArrowRight' || event.key == 'd')) {
            console.log("Direita")
            setLeft(left+5)
        }
    };

    useEffect(()=>{
        document.getElementById("persona").style.marginTop = top + 'px'
        document.getElementById("persona").style.marginBottom = bottom + 'px'
        document.getElementById("persona").style.marginLeft = left + 'px'
        document.getElementById("persona").style.marginRight = right + 'px'
    }, [top, left, right, bottom]);

    return (
        
    <div className="screen">
        <img className="logo" src={logo} alt="logo PokeWay"/> 
        
        <div id='stars'></div>
        <div id='stars2'></div>
        <div id='stars3'></div>
        
        <div className="backScreenGame">

            <div className="container">
                <div className="mapGame"  tabIndex="0"  onKeyDown={(event) => handleKey(event)}>
                    <img src = {map1} className= "map"></img>
                    <img src = {persona} id="persona"></img>
                </div>  

                <div className="radarContainer">
                    <div className="radar">
                        <div className="pokemon">

                        </div>

                        <div className="pokemonInfo">

                        </div>
                    </div>

                    <div className="instructionGame">
                        <span className="instruction"> Utilize as setas do teclado para mover seu personagem e fique atento ao radar!</span>
                    </div>

                    <div className="catchPokemon">
                        <button className="catch"> Catch Pokemon! </button>
                    </div>

                </div>
            </div>
            
        </div>

    </div>);
}

export default Game;