import  React , { useState } from "react";
import './game.css' ;
import logo from "../../logo.png";
import map1 from "./maps/map1.png"
import map2 from "./maps/map2.png"
import map3 from "./maps/map3.png"

function Game(){

    let easy_pokemons = ['rattata','cubat','pidgey']

    return (
    
    <div className="screen">
        <img className="logo" src={logo} alt="logo PokeWay"/> 
        
        <div id='stars'></div>
        <div id='stars2'></div>
        <div id='stars3'></div>
        
        <div className="backScreenGame">

            <div className="container">
                <div className="mapGame">
                    <img src = {map1} className= "map"></img>
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