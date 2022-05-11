import React, { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";

import Background from "../AnimatedBackground/backgroung.js";
import './home.css' ;
const axios = require("axios");

function Home(){

    const [srcs, setSrcs] = useState([]);
    const [types, setTypes] = useState([]);
    const [inicialPokemon, setInicialPokemon] = useState("");
    const pokemonsInicias = ["bulbasaur", "charmander", "squirtle", "pikachu"];
    
    const navigate = useNavigate();
    
    async function pegaDados(){
        let srcsAuxi = [];
        let typesAuxi = [];
        for (let pokemon of pokemonsInicias){
            console.log(pokemon);
            let response = await axios.get('https://pokeapi.co/api/v2/pokemon/'+pokemon);
            srcsAuxi.push(response.data.sprites.front_default);
            typesAuxi.push(response.data.types[0].type.name);
            console.log(typesAuxi);
        }
        setSrcs(srcsAuxi);
        setTypes(typesAuxi);
    }

    useEffect(()=>{
        console.log("vamor pegar os dados");
        pegaDados();
    },[]);

    function onChangeValue(event) {
        setInicialPokemon(event.target.value);
        console.log(event.target.value);
    }

    function changeToMenu(){
        navigate('/menu')
    }

    return (
        <>  
            <Background></Background>

            <div className="backScreenHome">
                <div className="pokemonCardConteiner" onChange={(event)=>onChangeValue(event)}>
                    <h3>Choose your Pokémon to begin:</h3>
                    <div className="pokemonCard">
                        <img className="pokemonImage" alt="Bulbasaur" src={srcs[0]}/>
                        <p className="pokemonName">Bulbasaur</p>
                        <p>Type: {types[0]}</p>
                        <input type="radio" id="Bulbasaur" name="pokemonInicial" value="Bulbasaur"></input>
                        <label for="Bulbasaur"></label>
                    </div>
                    <div className="pokemonCard">
                        <img className="pokemonImage" alt="Pikachu" src={srcs[1]}/>
                        <p className="pokemonName">Charmander</p>
                        <p>Type: {types[1]}</p>
                        <input type="radio" id="Pikachu" name="pokemonInicial" value="Pikachu"></input>
                        <label for="Pikachu"></label>
                    </div>
                    <div className="pokemonCard">
                        <img className="pokemonImage" alt="Charmander" src={srcs[2]}/>
                        <p className="pokemonName">Squirtle</p>
                        <p>Type: {types[2]}</p>
                        <input type="radio" id="Charmander" name="pokemonInicial" value="Charmander"></input>
                        <label for="Charmander"></label>
                    </div>
                    <div className="pokemonCard">
                        <img className="pokemonImage" alt="Squirtle" src={srcs[3]}/>
                        <p className="pokemonName">Pikachu</p>
                        <p>Type: {types[3]}</p>
                        <input type="radio" id="Squirtle" name="pokemonInicial" value="Squirtle" checked></input>
                        <label for="Squirtle"></label>
                    </div>
                    <button className="next" onClick = {changeToMenu}>Next &raquo;</button>
                </div>
            </div>
        </>
    );
}

export default Home;