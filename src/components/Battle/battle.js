import { useNavigate , useLocation } from "react-router-dom";
import  React , { useState , useEffect} from "react";
import Background from "../AnimatedBackground/backgroung.js";
import './battle.css';
import AttackSound from "./sprites/atacou.mp3";
import WinSound from "./sprites/ganhou.mp3";
import catchingSong from "./sprites/PokemonCatch.mp3";
import catching from "./sprites/catching.gif";


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
        
        const url = 'https://pokeway.herokuapp.com/pokemons/'+username+'/'+battlePokemonName;

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


    async function postPokemonAndLevelUp(){
        let id = enemy + username;

        axios.post('https://pokeway.herokuapp.com/game/', {
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

        axios.post('https://pokeway.herokuapp.com/pokemons/'+ username + '/' + battlePokemonName, {
            "level": String(parseInt(level)+1)
        })
        .then((response2) => {
        console.log(response2.data);
        }, (error) => {
        console.log(error);
        });
        console.log("Level up!")

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
                setHp(0);
        
                document.getElementById("barMyPoke").style.width = `(${String(hp)}/250*100)%`;
                console.log("HP: "+ String(hp));
                setFimPartida(true)
                console.log("Perdeu!")
                document.getElementById('musicBattle').pause();
                document.getElementById('musicBattle').currentTime = 0;
                document.getElementById('musicTheme').play();
                navigate('/game', {state: {username:location.state.username, mapSelected:location.state.mapSelected}} );
            }else{
                setHp(hp - 30);
                console.log("HP: "+String(hp));
                document.getElementById("barMyPoke").style.width = `(${String(hp)}/250*100)%`;
                if (hp<=125 && hp>25){
                    document.getElementById("barMyPoke").style.backgroundColor = `rgb(251, 255, 10)`;
                }else if (hp<=50){
                    document.getElementById("barMyPoke").style.backgroundColor = `rgb(255, 0, 0)`;
                }

            }
            
        } else if(shoot<=5 & shoot >2 & !fimPartida & !notAttack){
            if(hp - 20 <0){
                setHp(0);
                document.getElementById("barMyPoke").style.width = `(${String(hp)}/250*100)%`;
                console.log("HP: "+String(hp));
                setFimPartida(true)
                console.log("Perdeu!")
                document.getElementById('musicBattle').pause();
                document.getElementById('musicBattle').currentTime = 0;
                document.getElementById('musicTheme').play();
                navigate('/game', {state: {username:location.state.username, mapSelected:location.state.mapSelected}} );
            }else{
                setHp(hp - 20)
                console.log("HP: "+String(hp));
                document.getElementById("barMyPoke").style.width = `(${String(hp)}/250*100)%`;
                if (hp<=125 && hp>25){
                    document.getElementById("barMyPoke").style.backgroundColor = `rgb(251, 255, 10)`;
                }else if (hp<=50){
                    document.getElementById("barMyPoke").style.backgroundColor = `rgb(255, 0, 0)`;
                }
            }
        }else if(!fimPartida & !notAttack){
            if(hp - 10 <0){
                setHp(0);
                console.log("HP: "+String(hp));
                document.getElementById("barMyPoke").style.width = `(${String(hp)}/250*100)%`;
                setFimPartida(true)
                console.log("Perdeu!")
                document.getElementById('musicBattle').pause();
                document.getElementById('musicBattle').currentTime = 0;
                document.getElementById('musicTheme').play();
                console.log("play na musica principal");
                navigate('/game', {state: {username:location.state.username, mapSelected:location.state.mapSelected}} );
            }else{
                setHp(hp - 15)
                console.log("HP: "+String(hp));
                document.getElementById("barMyPoke").style.width = `(${String(hp)}/250*100)%`;
                if (hp<=125 && hp>25){
                    document.getElementById("barMyPoke").style.backgroundColor = `rgb(251, 255, 10)`;
                }else if (hp<=50){
                    document.getElementById("barMyPoke").style.backgroundColor = `rgb(255, 0, 0)`;
                }
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
            setHpEnemy(0);
            document.getElementById("barEnemyPoke").style.width = `(${String(hpEnemy)}/250*100)%`;
            setFimPartida(true)
            setGanhou(true);
            console.log("Capturou!");
        }else if (!fimPartida){
            console.log("O damage: "+damage)
            document.getElementById('musicAtack').currentTime = 0;
            document.getElementById('musicAtack').play();
            setHpEnemy(hpEnemy-damage);
            document.getElementById("barEnemyPoke").style.width = `(${String(hpEnemy)}/250*100)%`;
            if (hpEnemy<=125 && hpEnemy>25){
                document.getElementById("barEnemyPoke").style.backgroundColor = `rgb(251, 255, 10)`;
            }else if (hpEnemy<=50){
                document.getElementById("barEnemyPoke").style.backgroundColor = `rgb(255, 0, 0)`;
            }
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
        postPokemonAndLevelUp();
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
                                <div className="headerInfoPoke">
                                    <div className="infoEnemyTitle"><h4> {String(enemy)[0].toUpperCase() + String(enemy).substr(1)} </h4> </div>
                                    <div className="infoEnemy"><h4>Lvl&ensp;</h4> {levelEnemy}</div>
                                </div>
                                <div className="geralInfosEnemy">
                                    <div className="infoEnemy"><h4>Type:&ensp;</h4>{ typeEnemy}</div>
                                    <div className="infoEnemy"><h4>Experience:&ensp;</h4>{baseExperienceEnemy}</div>
                                </div>
                                
                                <div className="w3-light-grey">
                                    <div id="barEnemyPoke" className="barMyPoke" style={{backgroundColor: "green", height: "1rem", width: `${String((parseInt(String(hpEnemy))*100/250))}%`}}>{String(hpEnemy)} </div>
                                </div><br></br>
                            </div>

                            <img src = {srcImgEnemy} alt="enemy" className="enemySprite"></img>
                        </div>

                        <div className="pokemonDiv">
                            <img src={srcImgBack} alt="myPokemon" className="myPokemonSprite"></img>

                            <div className="myPokemonContent">
                                <div className="headerInfoPoke">
                                    <div className="infoMyPokemonTitle"><h4> {String(battlePokemonName)[0].toUpperCase() + String(battlePokemonName).substr(1)} </h4> </div>
                                    <div className="infoMyPokemon"><h4>Lvl &ensp;</h4> {level}</div>
                                </div>
                                <div className="w3-light-grey">
                                    <div id="barMyPoke" className="barMyPoke" style={{backgroundColor: "green", height: "1rem", width: `${String((parseInt(String(hp))*100/250))}%`}}>{String(hp)} </div>
                                </div><br></br>
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
                                            {String(move1).toUpperCase()}
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
                                            {String(move2).toUpperCase()}
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
                                            {String(move3).toUpperCase()}
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