import React, {useState} from "react";
import "./login.css";
import {Link, Redirect} from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import firebase from "../../config/firebase";
import "firebase/auth";

function Login() {

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgType, setMsgType] = useState();

    const dispatch = useDispatch();

    function autenticar(){
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(res => {
                setMsgType("ok");
                setTimeout(() => {
                    dispatch({type:'LOGIN', userEmail: email});
                }, 500)
            })
            .catch(err => {
                setMsgType("erro");
            })
    }

    return (
        <div className="login-content d-flex align-items-center">
            {
                useSelector(state => state.userLoged) > 0 ? <Redirect to="/" /> : null
            }

            <form className="form-signin mx-auto">
                <div className="text-center mb-4">
                    <i className="fas fa-book-open text-white fa-7x mb-5"></i>
                    <h1 className="h3 mb-3 fw-normal text-white font-weitght-bold">Login</h1>
                </div>

                <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control my-2" id="floatingInput" placeholder="Email"/>
                <input onChange={(e) => setSenha(e.target.value)} type="password" className="form-control my-2" id="floatingPassword" placeholder="Senha"/>
                <button className="btn btn-lg btn-login btn-block my-3" type="button" onClick={autenticar}>Entrar</button>


                <div className="text-white text-center my-5">
                    {msgType === "ok" && <span><strong>Uau!</strong> Você se conectou no sistema! &#128521;</span>}
                    {msgType === "erro" && <span><strong>Ah!</strong> Por favor, verifique se o seu e-mail e senha estão corretos! &#128533;</span>}                         
                </div>

                <div className="option-login mt-2">
                    <Link to="lostpassword" className="mx-2">Recuperar Senha</Link>
                    <span>&#9883;</span>
                    <Link to="newuser" className="mx-2">Quero me cadastrar</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;