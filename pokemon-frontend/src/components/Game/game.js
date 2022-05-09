import  React , { useState , useEffect } from "react";
import './game.css' ;
import logo from "../../logo.png";
import map1 from "./sprites/map1.png";
import map2 from "./sprites/map2.png";
import map3 from "./sprites/map3.png";
import persona from "./sprites/persona.png";
import radar from "./sprites/radar.gif";

const axios = require("axios");

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Game(){

    let easy_pokemons = ['rattata','zubat','pidgey'];

    let [left , setLeft] = useState(0);
    let [right , setRight] = useState(0);
    let [bottom , setBottom] = useState(0);
    let [top , setTop] = useState(0);

    let [pokeName, setPokeName] = useState(['']);
    let [pokeImg, setPokeImg] = useState(['']);
    let [baseExperience, setBaseExperience] = useState(['']);
    let [pokeType, setPokeType] = useState(['']);


    async function findPokemon(pokemon){

        const url = 'https://pokeapi.co/api/v2/pokemon/' + pokemon + '/'
        
        axios
            .get(url)
            .then((response) => {
                
                if(response.status == 200){
                    let src_img = response.data.sprites.front_default 
                    let type = response.data.types[0].type.name
                    let experience = response.data.base_experience
                    
                    setPokeImg(src_img);
                    setBaseExperience(experience);
                    setPokeType(type);
                    setPokeName(pokemon)
                }
                
            }, (error) => console.log(error));
    }

    const handleKey = (event) => {
        event.preventDefault();  
        if ((event.key == 'ArrowDown' || event.key == 's')) {
            console.log("Baixo")
            setTop(top+10)
            document.getElementById("persona").style.marginTop = top + 'px'
          }

        if ((event.key == 'ArrowUp' || event.key == 'w')) {
            console.log("Cima")
            setBottom(bottom+10)
            document.getElementById("persona").style.marginBottom = bottom + 'px'
        }
        if ((event.key == 'ArrowLeft' || event.key == 'a')) {
            console.log("Esquerda")
            setRight(right+10)
            document.getElementById("persona").style.marginRight = right + 'px'
        }
        if ((event.key == 'ArrowRight' || event.key == 'd')) {
            console.log("Direita")
            setLeft(left+10)
            document.getElementById("persona").style.marginLeft = left + 'px'
        }
    };

    useEffect(() => {

        setPokeImg('');
        setBaseExperience('');
        setPokeType('');

        let number = randomInt(0,20);

        if(number < 5){
            let pokemon_name = easy_pokemons[randomInt(0, easy_pokemons.length)];
            findPokemon(pokemon_name)
        }

    }, [top, bottom, left,right]);

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
                            {pokeImg != '' && baseExperience != '' &&  pokeType != '' ?
                            
                            <div className="radar_content">  
                                <div className="container_img">
                                    <img src = {pokeImg} className="pokemon_img"></img>
                                </div>
                            
                                <div className="pokemonInfo">
                                    <h3 className="textInfoName">{pokeName}</h3>
                                    <h3 className="textInfo">Type: {pokeType}</h3>
                                    <h3 className="textInfo">Experience: {baseExperience}</h3>
                                </div>
                            </div>

                             : <img src = {radar} className='load'></img>}
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