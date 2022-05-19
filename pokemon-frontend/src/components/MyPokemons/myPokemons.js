import { Link, useNavigate , useLocation } from "react-router-dom";
import  React , { useState, useEffect } from "react";
import './myPokemons.css' ;



import PokeCards from "../PokeCards/pokeCards";
import Background from "../AnimatedBackground/backgroung.js";


const axios = require("axios");

function MyPokemons(props){
    const navigate = useNavigate();
    const location = useLocation();
    let [pokeListNames, setPokeListNames] = useState(['']);
    let [battlePokemon, setBattlePokemon] = useState(['']);
    const username = location.state.username

    function voltaMenu(){
        navigate('/menu', {state: {username:username, mapSelected:location.state.mapSelected
        }} );
    }

    function voltaGame(){
        navigate('/game', {state: {username:username, mapSelected:location.state.mapSelected}} );
    }

    function goBattle(){

        if(battlePokemon != ''){
            document.getElementById('musicTheme').pause();
            document.getElementById('musicTheme').currentTime = 0; //isso é parar parar a principal

            document.getElementById('musicBattle').play();
            console.log("dei o play na battleSong. Tá tocando?");
            navigate('/battle', {state: {username:username, battlePokemon:battlePokemon, enemy:location.state.enemy, mapSelected:location.state.mapSelected}});
        }else {
            alert("Selecione um pokemon!");
        }
        
    }

    function onChangeBattle(event){
        if(location.pathname == '/pokemons'){
            console.log("Nada a ser feito")
        }else{
            console.log("Selecionado:");
            let selectedName = event.target.value;
            setBattlePokemon(selectedName);
        }
    }

    async function getPokemons(){
        let response = await axios.get('http://localhost:8000/pokemons/'+username+'/');
        let names = [];
        response.data.map((pokemon)=>(names.push({ "name": pokemon.name, "srcImg": pokemon.srcImg, "type": pokemon.type , "level":pokemon.level})));
        setPokeListNames(names);    
    }
    
    useEffect(()=>{
        // console.log("vamor pegar os meus pokemons");
        getPokemons();
    },[]);

    return (

        <>  
            <Background></Background>

            <div className="backScreenGame">

                <div className="container">
                    <div className="allCaught">
                        <div className="allCaughtHeader">
                                {
                                    location.pathname == '/pokemons' ? <a onClick={voltaMenu} className="backBotao" >&larr;</a> : <a onClick={voltaGame} className="backBotao" >&larr;</a>
                                }
                                
                                {
                                    location.pathname == '/pokemons' ? <h3>All Caught</h3> : <h3>Choose pokemon for battle</h3>
                                }
                                
                        </div>
                        <div className="imagesAllCaughtConteiner" onChange={(event)=>onChangeBattle(event)}>

                            {pokeListNames.map((pokemons) => (
                                <PokeCards name_pokemon={pokemons.name} src_img={pokemons.srcImg} level={pokemons.level} url={location.pathname}>{pokemons.type}</PokeCards>
                            ))}

                        </div>

                        {location.pathname == '/pokemons' ? <></> : 
                        <div className="footerChoose">
                            <button onClick={goBattle} className="goBattle"> Battle &raquo;</button>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </>         
    );}

export default MyPokemons;