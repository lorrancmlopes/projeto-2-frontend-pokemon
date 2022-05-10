import  React from "react";
import './pokeCards.css'

function PokeCards(props) {

    return (
        <div className="AllCaughtCard">
            <img className="imageAllCaught" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" alt="pikachu Teste"/>
            <h4>{props.name_pokemon}</h4>
            <h4>{props.children}</h4>
        </div>
    );
}

export default PokeCards;