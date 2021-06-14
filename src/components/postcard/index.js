import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "./postcard.css";

function PostCard(){
    return(
        <div className="col-md-3 col-sm-12">
            <img id="imgCard" src="https://via.placeholder.com/100x50" className="card-img-top" />

            <div className="card-body">
                <h5>Título do post</h5>
                <p className="card-text text-justify">Detalhes do post</p>

                <div className="row rodape-card d-flex align-items-center">
                    <div className="col-6">
                        <Link to="/" className="btn btn-sm btn-detalhes">+ detalhes</Link>
                    </div>
                    <div className="col-6">
                        <i class="fas fa-eye"></i><span>29305</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostCard;