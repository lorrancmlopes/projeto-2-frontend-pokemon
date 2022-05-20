import React, { useEffect, useState } from "react";
import { useNavigate , useLocation} from "react-router-dom";

import Background from "../AnimatedBackground/backgroung.js";
import './home.css' ;
const axios = require("axios");

function Home(){

    const [srcs, setSrcs] = useState([]);
    const [types, setTypes] = useState([]);
    const [inicialPokemon, setInicialPokemon] = useState("pikachu");
    const pokemonsInicias = ["bulbasaur", "charmander", "squirtle", "pikachu"];
    
    const navigate = useNavigate();
    const location = useLocation();
    
    async function pegaDados(){
        let srcsAuxi = [];
        let typesAuxi = [];
        for (let pokemon of pokemonsInicias){
            console.log(pokemon);
            let response = await axios.get('https://pokeapi.co/api/v2/pokemon/'+pokemon);
            srcsAuxi.push(response.data.sprites.front_default);
            typesAuxi.push(response.data.types[0].type.name);
            console.log(typesAuxi);
            console.log("moves\n");
            console.log(response.data.moves[2].move.name);
        }
        setSrcs(srcsAuxi);
        setTypes(typesAuxi);
    }

    useEffect(()=>{
        pegaDados();
    },[]);

    function onChangeValue(event) {
        setInicialPokemon(event.target.value);
        console.log(event.target.value);
    }

    async function postSelectedInicialPokemon(){


        let id, type, userId, name, move1, move2, move3, srcImg, srcImgBack, favorite, hp, level
        let response = await axios.get('https://pokeapi.co/api/v2/pokemon/'+inicialPokemon + '/');
        name = inicialPokemon;
        userId = location.state.username;
        id = name + userId;
        type = response.data.types[0].type.name;
        favorite = false;

        move1 = response.data.moves[0].move.name;
        move2 = response.data.moves[1].move.name;
        move3 = response.data.moves[2].move.name;

        srcImg = response.data.sprites.front_default;
        srcImgBack = response.data.sprites.back_default

        hp = '250';
        level = '5';                                                /*Level inicial*/

        //let response2 = await 
        axios.post('https://pokeway.herokuapp.com/pokemon/', {
            "id": id,
            "idUser": userId,
            "name": name,
            "type": type,
            "move1": move1,
            "move2": move2,
            "move3": move3,
            "srcImg": srcImg,
            "srcImgBack": srcImgBack,
            "favorite": favorite,
            "hp": hp,
            "level":level
        })
        .then((response2) => {
        console.log(response2.data);
        }, (error) => {
        console.log(error);
        });

        axios.post('https://pokeway.herokuapp.com/users/'+ userId +'/', {
            "name": userId,
            "password": location.state.password,
            "selectedFirtsPokemon": true
        })
        .then((response2) => {
        console.log(response2.data);
        }, (error) => {
        console.log(error);
        });

    }

    async function changeToMenu(){
        navigate('/menu', {state:{username:location.state.username}});

        postSelectedInicialPokemon();
        console.log("setou para true");
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
                        <p className="descricao">Type: {types[0]}</p>
                        <p className="descricao">Level: 5 </p>
                        <input type="radio" id="Bulbasaur" name="pokemonInicial" value="bulbasaur"></input>
                        <label for="Bulbasaur"></label>
                    </div>
                    <div className="pokemonCard">
                        <img className="pokemonImage" alt="Pikachu" src={srcs[1]}/>
                        <p className="pokemonName">Charmander</p>
                        <p className="descricao">Type: {types[1]}</p>
                        <p className="descricao">Level: 5 </p>
                        <input type="radio" id="Charmander" name="pokemonInicial" value="charmander"></input>
                        <label for="Charmander"></label>
                    </div>
                    <div className="pokemonCard">
                        <img className="pokemonImage" alt="Charmander" src={srcs[2]}/>
                        <p className="pokemonName">Squirtle</p>
                        <p className="descricao">Type: {types[2]}</p>
                        <p className="descricao">Level: 5 </p>
                        <input type="radio" id="Squirtle" name="pokemonInicial" value="squirtle"></input>
                        <label for="Squirtle"></label>
                    </div>
                    <div className="pokemonCard">
                        <img className="pokemonImage" alt="Squirtle" src={srcs[3]}/>
                        <p className="pokemonName">Pikachu</p>
                        <p className="descricao">Type: {types[3]}</p>
                        <p className="descricao">Level: 5 </p>
                        <input type="radio" id="Pikachu" name="pokemonInicial" value="pikachu" checked></input>
                        <label for="Pikachu"></label>
                    </div>
                    <button className="next" onClick = {changeToMenu}>Next &raquo;</button>
                </div>
            </div>
        </>
    );
}

export default Home;