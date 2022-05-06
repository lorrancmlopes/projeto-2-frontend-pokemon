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

                    </div>

                    <div className="cardGame">

                    </div>

                </div>
                
            </div>

        </div>
    );
    
}

export default Menu;