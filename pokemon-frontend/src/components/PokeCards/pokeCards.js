import  React from "react";
import './pokeCards.css'

function PokeCards(props) {

    return (
        <div className="AllCaughtCard">
            <img className="imageAllCaught" src= {props.src_img}/>
            <h2 className="infoPokeCardName">{String(props.name_pokemon)[0].toUpperCase() + String(props.name_pokemon).substr(1)}</h2>
            <h3 className="infoPokeCardType">Type : {props.children}</h3>
        </div>
    );
}

export default PokeCards;