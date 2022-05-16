import { useNavigate , useLocation } from "react-router-dom";

function Battle(props){

    const navigate = useNavigate();
    const location = useLocation();

    let battlePokemonName = location.state.battlePokemon
    let username = location.state.username
    let enemy = location.state.enemy

    console.log(battlePokemonName)
    console.log(username)
    console.log(enemy)

    return (
        <h3> Batalha !</h3>
    );
}

export default Battle;