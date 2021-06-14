import React from "react";
import "./navbar.css";
import {Link} from "react-router-dom";

import {useSelector, useDispatch} from 'react-redux';

function NavBar(){

    const dispatch = useDispatch();

    return(
        <nav className="navbar navbar-expand-lg">
            <i className="fas fa-book-open text-white fa-2x"></i>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i className="fas fa-bars text-white"></i>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto ml-4">
                    {
                        useSelector(state => state.userLoged) > 0 ?
                            <>
                            <li className="nav-item active">
                                <Link className="nav-link" to="#">Meus Posts</Link>
                            </li>

                            <li className="nav-item active">
                                <Link className="nav-link" to="newpost">Publicar Post </Link>
                            </li>

                            <li className="nav-item active">
                                <Link className="nav-link" onClick={() => dispatch({type:'LOGOUT'})}>Sair </Link>
                            </li>
                            </>
                        :
                            <>
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home </Link>
                            </li>

                            <li className="nav-item active">
                                <Link className="nav-link" to="newuser">Cadastrar </Link>
                            </li>

                            <li className="nav-item active">
                                <Link className="nav-link" to="login">Login </Link>
                            </li>
                            </>
                    }
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;