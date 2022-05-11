import  React from "react";
import './background.css' ;
import logo from "../../logo.png";

function Background(props){
    return (
        <div className="screen">
            <img className="logo" src={logo} alt="logo PokeWay"/> 
            
            <div id='stars'></div>
            <div id='stars2'></div>
            <div id='stars3'></div>

            {props.children}

        </div>    
    );
}

export default Background;