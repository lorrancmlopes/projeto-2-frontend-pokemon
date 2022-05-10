import { Link, useNavigate , useLocation } from "react-router-dom";
import  React , { useState } from "react";
import pikachu from "./pikachu.gif";
import logo from "../../logo.png";
import './myPokemons.css' ;





function MyPokemons(){
    const navigate = useNavigate();
    const location = useLocation();
    

    return (
<div className="screen">
        <img className="logo" src={logo} alt="logo PokeWay"/> 
            

        
        <div id='stars'></div>
        <div id='stars2'></div>
        <div id='stars3'></div>
        
        <div className="backScreenGame">

            <div className="container">
                <div className="allCaught">
                    <div className="allCaughtHeader">
                            <a href="/home" class="previous round">&larr;</a>
                            <h3>
                                All Caught
                            </h3>
                    </div>
                    <div className="imagesAllCaughtConteiner">
                        <div className="AllCaughtCard">
                            <img className="imageAllCaught" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" alt="pikachu Teste"/>
                            <h4>Pikachu</h4>
                            <h4>electry</h4>
                        </div>

                        <div className="AllCaughtCard">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" alt="pikachu Teste"/>
                            <h4>Pikachu</h4>
                            <h4>electry</h4>
                        </div>
                        <div className="AllCaughtCard">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" alt="pikachu Teste"/>
                            <h4>Pikachu</h4>
                            <h4>electry</h4>
                        </div>
                        <div className="AllCaughtCard">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" alt="pikachu Teste"/>
                            <h4>Pikachu</h4>
                            <h4>electry</h4>
                        </div>
                        <div className="AllCaughtCard">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" alt="pikachu Teste"/>
                            <h4>Pikachu</h4>
                            <h4>electry</h4>
                        </div>
                        <div className="AllCaughtCard">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" alt="pikachu Teste"/>
                            <h4>Pikachu</h4>
                            <h4>electry</h4>
                        </div>
                        <div className="AllCaughtCard">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" alt="pikachu Teste"/>
                            <h4>Pikachu</h4>
                            <h4>electry</h4>
                        </div>
                        <div className="AllCaughtCard">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" alt="pikachu Teste"/>
                            <h4>Pikachu</h4>
                            <h4>electry</h4>
                        </div>
                        <div className="AllCaughtCard">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" alt="pikachu Teste"/>
                            <h4>Pikachu</h4>
                            <h4>electry</h4>
                        </div>
                        <div className="AllCaughtCard">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" alt="pikachu Teste"/>
                            <h4>Pikachu</h4>
                            <h4>electry</h4>
                        </div>
                        <div className="AllCaughtCard">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" alt="pikachu Teste"/>
                            <h4>Pikachu</h4>
                            <h4>electry</h4>
                        </div>
                        <div className="AllCaughtCard">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" alt="pikachu Teste"/>
                            <h4>Pikachu</h4>
                            <h4>electry</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default MyPokemons;