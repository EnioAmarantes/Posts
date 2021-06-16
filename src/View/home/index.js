import React, {useState, useEffect} from "react";
import "./home.css";
import {Link} from "react-router-dom";
import { useSelector } from 'react-redux';

import NavBar from "../../components/navbar";
import PostCard from "../../components/postcard";
import firebase from "../../config/firebase";

function Home() {

    const [posts, setPosts] = useState([]);
    var listaPosts = [];

    useEffect(() => {
        firebase.firestore().collection('posts').get().then(async (res) => {
            await res.docs.forEach( doc => {
                listaPosts.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setPosts(listaPosts);
        })
    });

    return(
        <>
       <NavBar />
       {/* <h1>{useSelector(state => state.userEmail)}</h1> */}
       <div className="row p-2">
           {
               posts.map( item => 
                <PostCard key={item.id} id={item.id} title={item.titulo} description={item.descricao} view={item.visualizacoes} imagem={item.image} />
               )
           }
       </div>
       </>
    );
}

export default Home;