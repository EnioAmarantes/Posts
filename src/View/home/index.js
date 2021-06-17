import React, {useState, useEffect} from "react";
import "./home.css";
import {Link} from "react-router-dom";
import { useSelector } from 'react-redux';

import NavBar from "../../components/navbar";
import PostCard from "../../components/postcard";
import firebase from "../../config/firebase";

function Home({match}) {

    const [posts, setPosts] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    const usuarioEmail = useSelector(state => state.userEmail);

    var listaPosts = [];

    useEffect(() => {

        if(match.params.parametro) {
            firebase.firestore().collection('posts').where('usuario','==',usuarioEmail).get().then(async (res) => {
                await res.docs.forEach( doc => {
                    if(doc.data().titulo.indexOf(pesquisa) >= 0) {
                        listaPosts.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    }
                })
                setPosts(listaPosts);
            })
        }
        else {
            firebase.firestore().collection('posts').get().then(async (res) => {
                await res.docs.forEach( doc => {
                    if(doc.data().titulo.indexOf(pesquisa) >= 0) {
                        listaPosts.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    }
                })
                setPosts(listaPosts);
            })
        }
    });

    return(
        <>
       <NavBar />
       {/* <h1>{useSelector(state => state.userEmail)}</h1> */}

       <div className="row p-3">
           <h2 className="mx-auto p-3">Posts Publicados</h2>
           <input type="text" onChange={(e) => setPesquisa(e.target.value) } className="form-control text-center" placeholder="Pesquisar posts por título...."></input>
       </div>

       <div className="row p-2">
           {
               posts.map( item => 
                <PostCard key={item.id} id={item.id} titulo={item.titulo} descricao={item.descricao} visualizacoes={item.visualizacoes} imagem={item.image} />
               )
           }
       </div>
       </>
    );
}

export default Home;