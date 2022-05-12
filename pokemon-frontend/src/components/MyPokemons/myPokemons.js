import { Link, useNavigate , useLocation } from "react-router-dom";
import  React , { useState, useEffect } from "react";
import './myPokemons.css' ;



import PokeCards from "../PokeCards/pokeCards";
import Background from "../AnimatedBackground/backgroung.js";


const axios = require("axios");

function MyPokemons(){
    const navigate = useNavigate();
    const location = useLocation();
    let [pokeListNames, setPokeListNames] = useState(['']);
    const username = location.state.username

function voltaMenu(){
    navigate('/menu', {state: {username:username}} );
}

    


    async function getPokemons(){
        let response = await axios.get('http://localhost:8000/pokemons/'+username+'/');
        let names = [];
        response.data.map((pokemon)=>(names.push({ "name": pokemon.name, "srcImg": pokemon.srcImg, "type": pokemon.type})));
        setPokeListNames(names);
        
    }
    

    useEffect(()=>{
        console.log("vamor pegar os meus pokemons");
        getPokemons();
    },[]);

    return (

        <>  
            <Background></Background>

            <div className="backScreenGame">

                <div className="container">
                    <div className="allCaught">
                        <div className="allCaughtHeader">
                                <a onClick={voltaMenu} className="backBotao" >&larr;</a>
                                
                                <h3>All Caught</h3>
                        </div>
                        <div className="imagesAllCaughtConteiner">

                            {pokeListNames.map((pokemons) => (
                                <PokeCards name_pokemon={pokemons.name} src_img={pokemons.srcImg}>{pokemons.type}</PokeCards>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </>         
    );}

export default MyPokemons;