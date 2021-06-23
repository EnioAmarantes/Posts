import React, {useEffect, useState} from 'react';
import {Link, Redirect } from 'react-router-dom';
import firebase from '../../config/firebase';
import {useSelector} from 'react-redux';
import './postdetails.css';

import NavBar from '../../components/navbar';

function PostDetails({match}) {

    const [post, setPost] = useState({});
    const [urlImg, setUrlImg] = useState();
    const [carregando, setCarregando] = useState(1);
    const [excluido, setExcluido] = useState(0);
    const usuarioLogado = useSelector(state => state.userEmail);

    useEffect( () => {
        firebase.firestore().collection('posts').doc(match.params.idPost).get().then( res => {
            setPost(res.data());
            firebase.firestore().collection('posts').doc(match.params.idPost).update('visualizacoes', res.data().visualizacoes + 1)
            firebase.storage().ref(`imagens/${res.data().image}`).getDownloadURL().then( url => {
                setUrlImg(url);
                setCarregando(0);
            });
        })
    }, []);

    function remover(){
        firebase.firestore().collection('posts').doc(match.params.idPost).delete().then(() => {
            setExcluido(1);
        })
    }
    return (
        <>
        <NavBar />

        { excluido ? <Redirect to="/" /> : null }

        <div className="container-fluid">
            {
                carregando ? 
                <div className="row">
                    <div className="spinner-border text-secondary mx-auto mt-5" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                :
                <div>
                <div className="row">
                    <img src={urlImg} className="img-banner" alt="Banner" />
                    <div className="col-12 text-right mt-2 visualizacoes">
                        <i class="fas fa-eye"></i><span>  {post.visualizacoes + 1}</span>
                    </div>
                    <h3 className="mx-auto mt-5 text-center titulo"> {post.titulo} </h3>
                </div>

                <div className="row mt-3 d-flex justify-content-around">
                    <div className="col-md-3 col-sm-12 p-3 box-info my-2">
                        <i className="fas fa-ticket-alt fa-2x mb-2"></i>
                        <h5><strong>Tipo</strong></h5>
                        <span className="mt-3">{post.tipo}</span>
                    </div>

                    <div className="col-md-3 col-sm-12 p-3 box-info my-2">
                        <i className="fas fa-calendar-alt fa-2x mb-2"></i>
                        <h5><strong>Data</strong></h5>
                        <span className="mt-3">{post.data}</span>
                    </div>

                    <div className="col-md-3 col-sm-12 p-3 box-info my-2">
                        <i className="fas fa-clock fa-2x mb-2"></i>
                        <h5><strong>Hora</strong></h5>
                        <span className="mt-3">{post.hora}</span>
                    </div>
                </div>

                <div className="row box-detalhes mt-5">
                    <div className="col-12 text-center">
                        <h5><strong>Descrição</strong></h5>
                    </div>
                    <div className="col-12 text-center">
                        <p className="text-justify p-5">{post.descricao}</p>
                    </div>
                </div>

                {
                    usuarioLogado === post.usuario
                    ? <Link to={`/postedit/${match.params.idPost}`} className="btn-editar"><i className="fas fa-pen-square fa-2x"></i></Link>
                    : null
                }

                {
                    usuarioLogado === post.usuario
                    ? <button onClick={remover} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">Remover Post</button>
                    : null
                }
                </div>
            }
        </div>
        </>
    )
}

export default PostDetails;