import { useNavigate , useLocation } from "react-router-dom";
import  React , { useState , useEffect} from "react";
import Background from "../AnimatedBackground/backgroung.js";
import './battle.css';
import arena from './arena2.png'

const axios = require("axios");

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Battle(props){

    const navigate = useNavigate();
    const location = useLocation();

    let battlePokemonName = location.state.battlePokemon
    let username = location.state.username
    let enemy = location.state.enemy

    let [damage , setDamage] = useState(10);
    let [fimPartida, setFimPartida] = useState(false);
    let [notAttack, setNotAttack] = useState(false);

    // Meu pokemon :
    const [srcImgBack, setsrcImgBack] = useState([''])
    const [hp, setHp] = useState([''])
    const [level, setLevel] = useState([''])
    const [move1, setmove1] = useState([''])
    const [move2, setmove2] = useState([''])
    const [move3, setmove3] = useState([''])

    // Inimigo :
    const [srcImgEnemy, setsrcImgEnemy] = useState([''])
    const [srcImgEnemyBack, setsrcImgEnemyBack] = useState([''])
    const [typeEnemy, settypeEnemy] = useState([''])
    const [move1Enemy, setmove1Enemy] = useState([''])
    const [move2Enemy, setmove2Enemy] = useState([''])
    const [move3Enemy, setmove3Enemy] = useState([''])
    const [baseExperienceEnemy, setbaseExperienceEnemy] = useState([''])
    const [hpEnemy, setHpEnemy] = useState(250)
    const [levelEnemy, setLevelEnemy] = useState(5)

    async function getUserPokemonInformation(){
        
        const url = 'http://localhost:8000/pokemons/'+username+'/'+battlePokemonName;

        axios
        .get(url)
        .then((response) => {

            setsrcImgBack(response.data.srcImgBack);
            setHp(response.data.hp);
            setLevel(response.data.level);
            setmove1(response.data.move1);
            setmove2(response.data.move2);
            setmove3(response.data.move3);

        }, (error) => console.log(error));
    }

    async function getEnemyPokemon(){
        const url = 'https://pokeapi.co/api/v2/pokemon/'+enemy+'/'

        axios
            .get(url)
            .then((response) => {
                
                if(response.status == 200){
                    settypeEnemy(response.data.types[0].type.name);
                    setsrcImgEnemy(response.data.sprites.front_default);
                    setsrcImgEnemyBack(response.data.sprites.back_default);
                    setmove1Enemy(response.data.moves[0].move.name);
                    setmove2Enemy(response.data.moves[1].move.name);
                    setmove3Enemy(response.data.moves[2].move.name);
                    setbaseExperienceEnemy(response.data.abilities.base_experience)
                }
                
            }, (error) => console.log(error));
    }

    function tookHit(){
        let shoot = randomInt(0,10);

        if(shoot<=2 & !fimPartida & !notAttack){
            if(hp - 30 <0){
                setHp(0)
                setFimPartida(true)
                console.log("Perdeu!")
            }else{
                setHp(hp - 30)
            }
            
        } else if(shoot<=5 & shoot >2 & !fimPartida & !notAttack){
            if(hp - 20 <0){
                setHp(0)
                setFimPartida(true)
                console.log("Perdeu!")
            }else{
                setHp(hp - 20)
            }
        }else if(!fimPartida & !notAttack){
            if(hp - 15 <0){
                setHp(0)
                setFimPartida(true)
                console.log("Perdeu!")
            }else{
                setHp(hp - 15)
            }
        }
    }

    function applyDamage (){

        if(hpEnemy-damage<0 & !fimPartida){
            setHpEnemy(0)
            setFimPartida(true)
            console.log("Capturou!")
        }else if (!fimPartida){
            console.log("O damage: "+damage)
            setHpEnemy(hpEnemy-damage);
            tookHit()
        }    
    }

    function onChangeValue (event){
        if(event.target.value === 'move1'){
            let number = randomInt(0,10);
            if(number<=2){
                setDamage(80)
            }else{
                setDamage(5)
            }

        }else if(event.target.value === 'move2'){
            let number = randomInt(0,10);
            if(number<=5){
                setDamage(40)
            }else{
                setDamage(5)
            }

        }else if(event.target.value === 'move3'){
            setDamage(10)
        }else{
            alert("Escolha um ataque!");
            setNotAttack(true)
        }
    }

    useEffect(() => {
        getEnemyPokemon()
        getUserPokemonInformation()
    }, [])

    return (
        <>
            <Background></Background>
            <div className="backScreenBattle">
                <div className="containerBattle">
                    <div className="arena">
                        
                        <div className="enemyDiv">
                            <div className="enemyContent">
                                <div className="infoEnemyTitle"><h4> {enemy} </h4> </div>
                                <div className="infoEnemy"><h4>Level:&ensp;</h4> {levelEnemy}</div>
                                <div className="infoEnemy"><h4>Type:&ensp;</h4>{ typeEnemy}</div>
                                <div className="infoEnemy"><h4>Experience:&ensp;</h4>{baseExperienceEnemy}</div>
                                <div className="infoEnemy"><h4>HP:&ensp;</h4>{hpEnemy}</div>
                            </div>

                            <img src = {srcImgEnemy} alt="enemy" className="enemySprite"></img>
                        </div>

                        <div className="pokemonDiv">
                            <img src={srcImgBack} alt="myPokemon" className="myPokemonSprite"></img>

                            <div className="myPokemonContent">
                                <div className="infoMyPokemonTitle"><h4> {battlePokemonName} </h4> </div>
                                <div className="infoMyPokemon"><h4>Level :&ensp;</h4> {level}</div>
                                <div className="infoMyPokemon"><h4>XP :&ensp;</h4>{hp}</div>
                            </div>

                        </div>
                
                    </div>

                    <div className="movesPlayer">

                            <div className="headerBattle">
                                <div className="contentHeaderBattle">
                                    <h3 className="battleTitle">Choose a attack: </h3>
                                </div>  
                            </div>

                            <div className="movesOptions"  onChange={(event)=>onChangeValue(event)}>
                                <div className="actionsCards">
                                    <input type="radio" name="move" value="move1" className="selectMove"></input>
                                    <div className="moveInfo">
                                        <h4 className="moveName">
                                            {move1}
                                        </h4>
                                        <div className="descriptionMove">
                                            <h4 className="informationMove">Accuracy : 10 %</h4>
                                            <div id="informationDamage">Damage:&ensp;<h4 className="hightDamage">Hight</h4></div>     
                                        </div>
                                    </div>
                                </div>
                                <div className="actionsCards">
                                    <input type="radio" name="move" value="move2" className="selectMove"></input>
                                    <div className="moveInfo">
                                        <h4 className="moveName">
                                            {move2}
                                        </h4>
                                        <div className="descriptionMove">
                                            <h4 className="informationMove">Accuracy : 50 %</h4>
                                            <div id="informationDamage">Damage:&ensp;<h4 className="mediumDamage">Medium</h4></div>     
                                        </div>
                                    </div>
                                </div>
                                <div className="actionsCards">
                                    <input type="radio" name="move" value="move3" className="selectMove" defaultChecked></input>
                                    <div className="moveInfo">
                                        <h4 className="moveName">
                                            {move3}
                                        </h4>
                                        <div className="descriptionMove">
                                            <h4 className="informationMove">Accuracy : 80 %</h4>
                                            <div id="informationDamage">Damage:&ensp;<h4 className="lowDamage">Low</h4></div>     
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="attackButton">
                                <button className="attack" onClick={applyDamage}>
                                    Attack !
                                </button>
                            </div>
                        
                    </div>
                </div>
                
            </div>
            
        </>
        
    );
}

export default Battle;