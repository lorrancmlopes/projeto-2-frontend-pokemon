import { Link, useNavigate , useLocation } from "react-router-dom";
import  React , { useState } from "react";
import pikachu from "./pikachu.gif";
import logo from "../../logo.png";
import './myPokemons.css' ;

import PokeCards from "../PokeCards/pokeCards";

function MyPokemons(){
    const navigate = useNavigate();
    const location = useLocation();
    
    const mypokemons = [
        {
          name: "Pikachu",
          type: "electry",
        },
        {
            name: "Pikachu",
            type: "electry",
        },
        {
            name: "Pikachu",
            type: "electry",
        },
        {
            name: "Pikachu",
            type: "electry",
        },
        {
            name: "Pikachu",
            type: "electry",
        },
        {
            name: "Pikachu",
            type: "electry",
        },
        {
            name: "Pikachu",
            type: "electry",
        },
        {
            name: "Pikachu",
            type: "electry",
        },
        {
            name: "Pikachu",
            type: "electry",
        },
        {
            name: "Pikachu",
            type: "electry",
        },
        {
            name: "Pikachu",
            type: "electry",
        },
        {
            name: "Pikachu",
            type: "electry",
        },
        {
            name: "Pikachu",
            type: "electry",
        },
    ];

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

                        {mypokemons.map((pokemons) => (
                            <PokeCards name_pokemon={pokemons.name}>{pokemons.type}</PokeCards>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default MyPokemons;