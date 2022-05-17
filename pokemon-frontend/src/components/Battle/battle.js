import { useNavigate , useLocation } from "react-router-dom";
import  React , { useState , useEffect} from "react";
import Background from "../AnimatedBackground/backgroung.js";
import './battle.css';
import arena from './arena2.png'
import AttackSound from "./atacou.mp3";
import WinSound from "./ganhou.mp3";
import catchingSong from "./PokemonCatch.mp3";
import catching from "./catching.gif";


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
    let [ganhou, setGanhou] = useState(false);
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


    async function postPokemon(){
        let id = enemy + username;

        axios.post('http://localhost:8000/game/', {
            "id": id,
            "idUser": username,
            "name": enemy,
            "type": typeEnemy,
            "move1": move1Enemy,
            "move2": move2Enemy,
            "move3": move3Enemy,
            "srcImg": srcImgEnemy,
            "srcImgBack": srcImgEnemyBack,
            "hp":"250",
            "level":"5",
            "favorite": false,
        })
        .then((response2) => {
        console.log(response2.data);
        }, (error) => {
        console.log(error);
        });
        console.log("Postou!")
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
                    setbaseExperienceEnemy(response.data.base_experience);
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
                document.getElementById('musicBattle').pause();
                document.getElementById('musicBattle').currentTime = 0;
                document.getElementById('musicTheme').play();
                navigate('/game', {state: {username:location.state.username, mapSelected:location.state.mapSelected}} );
            }else{
                setHp(hp - 30)
            }
            
        } else if(shoot<=5 & shoot >2 & !fimPartida & !notAttack){
            if(hp - 20 <0){
                setHp(0)
                setFimPartida(true)
                console.log("Perdeu!")
                document.getElementById('musicBattle').pause();
                document.getElementById('musicBattle').currentTime = 0;
                document.getElementById('musicTheme').play();
                navigate('/game', {state: {username:location.state.username, mapSelected:location.state.mapSelected}} );
            }else{
                setHp(hp - 20)
            }
        }else if(!fimPartida & !notAttack){
            if(hp - 10 <0){
                setHp(0)
                setFimPartida(true)
                console.log("Perdeu!")
                document.getElementById('musicBattle').pause();
                document.getElementById('musicBattle').currentTime = 0;
                document.getElementById('musicTheme').play();
                console.log("play na musica principal");
                navigate('/game', {state: {username:location.state.username, mapSelected:location.state.mapSelected}} );
            }else{
                setHp(hp - 15)
            }
        }

        shakeMyPokemon()
    }

    function applyDamage (){
        console.log("O damage atual é: " + damage)
        if(hpEnemy-damage<0 & !fimPartida){
            document.getElementById('musicBattle').pause();
            document.getElementById('musicBattle').currentTime = 0;
            document.getElementById('musicCatch').play();
            setHpEnemy(0)
            setFimPartida(true)
            setGanhou(true);
            console.log("Capturou!");
            // navigate('/game', {state: {ganhou:ganhou}} );
        }else if (!fimPartida){
            console.log("O damage: "+damage)
            document.getElementById('musicAtack').currentTime = 0;
            document.getElementById('musicAtack').play();
            setHpEnemy(hpEnemy-damage);
            shakePokemonEnemy()
            setTimeout(() => { tookHit(); }, 500);
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

    function shakePokemonEnemy(){

        const element =  document.querySelector('.enemySprite');
        element.classList.add('shake');
        setTimeout(function() {
          element.classList.remove('shake'); 
        }, 500); 
    }

    function shakeMyPokemon(){
        const element =  document.querySelector('.myPokemonSprite');
        element.classList.add('shake');
        setTimeout(function() {
          element.classList.remove('shake'); 
        }, 500); 
    }   

    useEffect(() => {
        getEnemyPokemon()
        getUserPokemonInformation()
    }, [])


    function voltaMapa(){
        document.getElementById('musicTheme').play();
        console.log("play na musica principal");
        document.getElementById('gif').src='nada';
        navigate('/game', {state: {username:location.state.username, mapSelected:location.state.mapSelected}} );
        console.log("Apertou o botão fechar");
        postPokemon();
        console.log("postou!")
    }

    return (
        <>
            <Background></Background>
            <audio id="musicAtack" src={AttackSound} type="audio/mp3" />
            <audio id="musicCatch" src={catchingSong} type="audio/mp3" />
            <div className="backScreenBattle">
                {ganhou == false ? 





                <div className="containerBattle">
                    <div className="arena">
                        
                        <div className="enemyDiv">
                            <div className="enemyContent">
                                <div className="infoEnemyTitle"><h4> {String(enemy)[0].toUpperCase() + String(enemy).substr(1)} </h4> </div>
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
                                <div className="infoMyPokemonTitle"><h4> {String(battlePokemonName)[0].toUpperCase() + String(battlePokemonName).substr(1)} </h4> </div>
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

            :
            <>
                <div className="Gif"  tabIndex="0"  >
                    <button onClick={voltaMapa} className="close" >&times;</button>
                    <img src={catching} className= "imgGif" id="gif" alt="gif" loop="infinite"></img>
                </div>
            </>
            }
                
            </div>
            
        </>
        
    );
}

export default Battle;