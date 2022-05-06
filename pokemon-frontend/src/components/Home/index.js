import React, { useEffect, useState } from "react";
import pikachu from "./pikachu.gif";
import logo from "../../logo.png";
import './home.css' ;
const axios = require("axios");

function Home(){

    const [baseExp, setBaseExp] = useState([]);
    const [srcs, setSrcs] = useState([]);
    const [types, setTypes] = useState([]);
    const [inicialPokemon, setInicialPokemon] = useState("");
    const pokemonsInicias = ["bulbasaur", "pikachu", "charmander", "squirtle"];
    
    
    async function pegaDados(){
        //let heightsAuxi = [];
        let srcsAuxi = [];
        let typesAuxi = [];
        let baseExpAuxi = [];
        for (let pokemon of pokemonsInicias){
            console.log(pokemon);
            let response = await axios.get('https://pokeapi.co/api/v2/pokemon/'+pokemon);
            baseExpAuxi.push(response.data.base_experience);
            srcsAuxi.push(response.data.sprites.front_default);
            typesAuxi.push(response.data.types[0].type.name);
            console.log(typesAuxi);
        }
        setBaseExp(baseExpAuxi);
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

    return (
        <div className="screen">
            <img className="logo" src={logo} alt="logo PokeWay"/> 
            <div id='stars'></div>
            <div id='stars2'></div>
            <div id='stars3'></div>
            
            <div className="backScreen">
                <div className="pokemonCardConteiner" onChange={(event)=>onChangeValue(event)}>
                    <p>Choose your Pokémon to begin:</p>
                    <div className="pokemonCard">
                        <img className="pokemonImage" alt="Bulbasaur" src={srcs[0]}/>
                        <p className="pokemonName">Bulbasaur</p>
                        <p>Type: {types[0]}</p>
                        <p>Base Experience: {baseExp[0]}</p>
                        <input type="radio" id="Bulbasaur" name="pokemonInicial" value="Bulbasaur"></input>
                        <label for="Bulbasaur"></label>
                    </div>
                    <div className="pokemonCard">
                        <img className="pokemonImage" alt="Pikachu" src={srcs[1]}/>
                        <p className="pokemonName">Pikachu</p>
                        <p>Type: {types[1]}</p>
                        <p>Base Experience: {baseExp[1]}</p>
                        <input type="radio" id="Pikachu" name="pokemonInicial" value="Pikachu"></input>
                        <label for="Pikachu"></label>
                    </div>
                    <div className="pokemonCard">
                        <img className="pokemonImage" alt="Charmander" src={srcs[2]}/>
                        <p className="pokemonName">Charmander</p>
                        <p>Type: {types[2]}</p>
                        <p>Base Experience: {baseExp[2]}</p>
                        <input type="radio" id="Charmander" name="pokemonInicial" value="Charmander"></input>
                        <label for="Charmander"></label>
                    </div>
                    <div className="pokemonCard">
                        <img className="pokemonImage" alt="Squirtle" src={srcs[3]}/>
                        <p className="pokemonName">Squirtle</p>
                        <p>Type: {types[3]}</p>
                        <p>Base Experience: {baseExp[3]}</p>
                        <input type="radio" id="Squirtle" name="pokemonInicial" value="Squirtle"></input>
                        <label for="Squirtle"></label>
                    </div>
                    <p><a class="next">Next &raquo;</a></p>
                </div>
            </div>

            <div id="pikachu">
                <img src={pikachu} alt="running pikachu" className="img_pikachu" />
            </div>
        </div>
    );
}

export default Home;


// VERSÃO REDUZIDA QUE TEM BUG NO PIKACHU ????????

// import React, { useEffect, useState } from "react";
// import pikachu from "./pikachu.gif";
// import logo from "../../logo.png";
// import './home.css' ;
// const axios = require("axios");

// function Home(){

//     const [baseExp, setBaseExp] = useState({});
//     const [srcs, setSrcs] = useState({});
//     const [types, setTypes] = useState({});
//     const [inicialPokemon, setInicialPokemon] = useState("");
//     const pokemonsInicias = ["bulbasaur", "pikachu", "charmander", "squirtle"];
    
    
//     async function pegaDados(){
//         //let heightsAuxi = [];
//         let srcsAuxi = {"bulbasaur":"", "pikachu":"", "charmander": "", "squirtle":""};
//         let typesAuxi = {"bulbasaur":"", "pikachu":"", "charmander": "", "squirtle":""};
//         let baseExpAuxi = {"bulbasaur":"", "pikachu":"", "charmander": "", "squirtle":""} ;
//         for (let pokemon of pokemonsInicias){
//             console.log(pokemon);
//             let response = await axios.get('https://pokeapi.co/api/v2/pokemon/'+pokemon);
//             baseExpAuxi[pokemon] = response.data.base_experience;
//             srcsAuxi[pokemon] = response.data.sprites.front_default;
//             typesAuxi[pokemon] = response.data.types[0].type.name;
//             //console.log();
//         }
//         setBaseExp(baseExpAuxi);
//         setSrcs(srcsAuxi);
//         setTypes(typesAuxi);
//     }

//     useEffect(()=>{
//         console.log("vamor pegar os dados");
//         pegaDados();
//     },[]);

//     function onChangeValue(event) {
//         setInicialPokemon(event.target.value);
//         console.log(event.target.value);
//     }

//     return (
//         <div className="screen">
//             <img className="logo" src={logo} alt="logo PokeWay"/> 
//             <div id='stars'></div>
//             <div id='stars2'></div>
//             <div id='stars3'></div>
            
//             <div className="backScreen">
//                 <div className="pokemonCardConteiner" onChange={(event)=>onChangeValue(event)}>
//                     <p>Choose your Pokémon to begin:</p>

//                     {pokemonsInicias.map((pokemon) => (
//                     <div className="pokemonCard">
//                         <img className="pokemonImage" alt={pokemon} src={srcs[pokemon]}/>
//                         <p className="pokemonName">{pokemon}</p>
//                         <p>Type: {types[pokemon]}</p>
//                         <p>Base Experience: {baseExp[pokemon]}</p>
//                         <input type="radio" id={pokemon} name="pokemonInicial" value={pokemon}></input>
//                         <label for={pokemon}></label>
//                     </div>
//                     ))}
                    
//                     <p><a class="next">Next &raquo;</a></p>
//                 </div>
//             </div>

//             <div id="pikachu">
//                 <img src={pikachu} alt="running pikachu" className="img_pikachu" />
//             </div>
//         </div>
//     );
// }

// export default Home;