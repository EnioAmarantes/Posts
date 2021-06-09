import React from "react";
import "./login.css";

function login() {
    return (
        <div className="login-content d-flex align-items-center">
            <form className="form-signin mx-auto">
                <div className="text-center mb-4">
                    <img className="mb-4" src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/>
                    <h1 className="h3 mb-3 fw-normal text-white font-weitght-bold">Please sign in</h1>
                </div>

                <input type="email" className="form-control my-2" id="floatingInput" placeholder="Email"/>
                <input type="password" className="form-control my-2" id="floatingPassword" placeholder="Senha"/>
                <button className="btn btn-lg btn-login btn-block my-3" type="submit">Entrar</button>


                <div className="text-white text-center my-5">
                    <span><strong>Uau!</strong>Você se conectou no sistema! &#128521;</span>
                    <br />
                    <span><strong>Ah!</strong>Por favor, verifique se o seu e-mail e senha estão corretos! &#128533;</span>
                </div>

                <div className="option-login mt-2">
                    <a href="#" className="mx-2">Recuperar Senha</a>
                    <span>&#9883;</span>
                    <a href="#" className="mx-2">Quero me cadastrar</a>
                </div>
            </form>
        </div>
    );
}

export default login;