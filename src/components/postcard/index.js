import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "./postcard.css";

import firebase from "../../config/firebase";

function PostCard({id, title, description, view, imagem}){

    const [urlImagem, setUrlImagem] = useState();

    useEffect( () => {
        firebase.storage().ref(`imagens/${imagem}`).getDownloadURL().then( url => {
            setUrlImagem(url);
        })
    })

    return(
        <div className="col-md-3 col-sm-12">
            <img id="imgCard" src={urlImagem} className="card-img-top" />

            <div className="card-body">
                <h5>{ title }</h5>
                <p className="card-text text-justify">{description}</p>

                <div className="row rodape-card d-flex align-items-center">
                    <div className="col-6">
                        <Link to={`/postdetalhes/${id}`} className="btn btn-sm btn-detalhes">+ detalhes</Link>
                    </div>
                    <div className="col-6">
                        <i class="fas fa-eye"></i><span>{view}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostCard;