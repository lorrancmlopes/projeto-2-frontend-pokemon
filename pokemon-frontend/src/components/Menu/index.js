import  React from "react";
import axios from 'axios';
import './menu.css' ;
import logo from "../../logo.png";

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
                            <h2 className="opMap">Choose a map for play</h2>
                            <div className="maps">
                                <div className="map"></div>
                                <div className="map"></div>
                                <div className="map"></div>
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