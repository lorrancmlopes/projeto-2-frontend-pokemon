import  React from "react";
import axios from 'axios';
import './menu.css' ;
import logo from "../../logo.png";

import map1 from "../Menu/map1.png";
import map2 from "../Menu/map2.png";
import map3 from "../Menu/map3.png";

function Menu(){

    return (
        <div className="screenGame">
            <img className="logo" src={logo} alt="logo PokeWay"/> 
            <div id='stars'></div>
            <div id='stars2'></div>
            <div id='stars3'></div>

            <div className="backScreenGame">
                <div className="container">

                    <div className="cardJogador">

                        <div className="infoPlayer">
                            <div className="avatar">
                                <img src="https://i.dstatic.com/images/sprites/nuser255.png" alt="avatar" className="img_avatar"/>
                            </div>
                            <div className="infos">
                                <h2 className="user_name">Username or email</h2>
                            </div>
                        </div>
                        
                        <div className="pokemons">
                            <button className="botaoPokemons">
                                See your Pokemons
                            </button>
                        </div>

                        <div className="botaoLogout">
                            <button className="botaoOut" >Log out</button>
                        </div>

                    </div>

                    <div className="cardGame">
                        
                        <div className="containerMaps">
                            <div className="headerGame">
                                <h2 className="opMap">Choose a map for play</h2>
                            </div>
                            
                            <div className="maps">
                                <div className="map">
                                    <img src={map1} alt="map1" className="map1"></img>
                                    <input type="radio" id="dewey" name="map1" value="dewey" checked></input>
                                </div>

                                <div className="map">
                                    <img  src={map2} alt="map2" className="map2"></img>
                                    <input type="radio" id="dewey" name="map1" value="dewey"></input>
                                </div>

                                <div className="map">
                                    <img  src={map3} alt="map3" className="map3"></img>
                                    <input type="radio" id="dewey" name="map1" value="dewey"></input>
                                </div>
                            </div>
                        </div>

                        <div className= "botaoPlay">
                            <button className="play">Play</button>
                        </div>

                    </div>

                </div>
                
            </div>

        </div>
    );
    
}

export default Menu;