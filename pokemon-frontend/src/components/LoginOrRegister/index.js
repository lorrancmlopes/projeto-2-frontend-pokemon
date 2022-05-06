import { Link, useNavigate , useLocation } from "react-router-dom";
import  React , { useState } from "react";
import axios from 'axios';
import './loginRegister.css' ;

import pikachu from "./pikachu.gif";
import logo from "../../logo.png";


// Senha sempre válida: 
// user: teste , senha: 12345

function LoginOrRegister(){
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const location = useLocation();
    
    function handleUpdate(event){
        event.preventDefault();
        
        if(location.pathname == '/login'){
            
            // Realiza um get  e verifica se o resultado obtido é de um usuario cadastrado
            let url = "http://localhost:8000/users/login/"

            axios({
                method:'get',
                url:url, 
                data: {
                    "name":user,
                    "password":password
                }
              }).then(
                (response) => {
                    console.log(response)

                    // if(response.data.name == user & response.data.passaword == password){
                    //     navigate('/home');
                    // }else{
                    //     return alert('Usuario ou senha incorretos!');
                    // };
                    
                    }, 
                (error) => {return alert('Usuario nao cadastrado! Cadastre-se para prosseguir.');}
              )
            
        }else{
            navigate('/login');
        }

    }

    return (
        <div className="screen">
            <img className="logo" src={logo} alt="logo PokeWay"/> 
            <div id='stars'></div>
            <div id='stars2'></div>
            <div id='stars3'></div>
            
            <div className="backScreen">
                <div className="login">

                    {location.pathname == '/login' ? <h2>Login to your account</h2> : <h2>Create account</h2>}
                    
                    <form className="formLogin" onSubmit={(event)=>{handleUpdate(event)}} >
                        <div class="input-parent">
                            {location.pathname == '/login' ? <label>Username or Email</label> : <label>Create username or email</label>}
                            <input type="text" id="username" onChange={(name) => setUser(name.target.value)}/>
                        </div>

                        <div class="input-parent">
                            {location.pathname == '/login' ? <label>Password</label> : <label>Create password</label>}
                            <input type="password" id="password" onChange={(senha) => setPassword(senha.target.value)}/>
                        </div>

                        {location.pathname == '/login' ? 
                        <button type="submit" onClick={()=>{}}>Login</button> : <button type="submit" onClick={()=>{}}>Create</button>
                        }
                    </form>

                    {location.pathname == '/login' ? 
                        <span><Link to = '/register'> Create an account </Link></span> : <span></span>
                    }

                </div>
            </div>

            <div id="pikachu">
                <img src={pikachu} alt="running pikachu" className="img_pikachu" />
            </div>
        </div>
    );
}

export default LoginOrRegister;