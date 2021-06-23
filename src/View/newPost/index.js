import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import "./newPost.css";
import NavBar from "../../components/navbar";
import firebase from "../../config/firebase";

function NewPost({match}){

    const [msgType, setMsgType] = useState();
    const [titulo, setTitulo] = useState();
    const [tipo, setTipo] = useState();
    const [descricao, setDescricao] = useState();
    const [data, setData] = useState();
    const [hora, setHora] = useState();
    const userEmail = useSelector(state => state.userEmail);
    const [carregando, setCarregando] = useState(0);
    const [imagemAtual, setImagemAtual] = useState();
    const [imagemNova, setImagemNova] = useState();

    const storage = firebase.storage();
    const db = firebase.firestore();

    useEffect( () => {
        if(match.params.idPost) {
            firebase.firestore().collection('posts').doc(match.params.idPost).get().then( res => {
                setTitulo(res.data().titulo);
                setTipo(res.data().tipo);
                setDescricao(res.data().descricao);
                setData(res.data().data);
                setHora(res.data().hora);
                setImagemAtual(res.data().image);
            })
        }
    }, [carregando])

    function editar(){
        setCarregando(1);
        setMsgType(null);

        if(imagemNova)
            storage.ref(`imagens/${imagemNova.name}`).put(imagemNova);

        db.collection('posts').doc(match.params.idPost).update({
            titulo: titulo,
            tipo: tipo,
            descricao: descricao,
            data: data,
            hora: hora,
            image: imagemNova ? imagemNova.name : imagemAtual.name
        }).then(() => {
            setMsgType("ok");
            setCarregando(0);
        }).catch( e => {
            setMsgType("erro");
            setCarregando(0);
        })
    }

    function cadastrar(){

        setCarregando(1);

        storage.ref(`imagens/${imagemNova.name}`).put(imagemNova).then(() => {
            db.collection(`posts`).add({
                titulo: titulo,
                tipo: tipo,
                descricao: descricao,
                data: data,
                hora: hora,
                image: imagemNova.name,
                public: 1,
                criacao: new Date(),
                usuario: userEmail,
                visualizacoes: 0
            }).then(() => {
                setMsgType("ok");
                setCarregando(0);
            }
            ).catch(() => {
                setMsgType("erro");
                setCarregando(0);
            })
        });
    }

    return (
        <>
            <NavBar />
            <div className="col-12">
                <div className="row">
                    <h3 className="row-auto font-weight-bold text-center">{ match.params.idPost ? 'Editar Post' : 'Novo Post' }</h3>
                </div>

                <form>
                    <div className="form-group mb-2">
                        <label>Título</label>
                        <input onChange={(e) => setTitulo(e.target.value)} type="text" className="form-control" value={titulo} />
                    </div>
                    <div className="form-group">
                        <label>Descripção do Post</label>
                        <textarea onChange={(e) => setDescricao(e.target.value)}className="form-control" rows="4" value={descricao}></textarea>
                    </div>

                    <div className="form-group">
                        <label>Selecione a Categoria do Post</label>
                        <select onChange={(e) => setTipo(e.target.value)}className="form-control" value={tipo}>
                            <option disabled selected value>Selecione uma Categoria</option>
                            <option>Pessoal</option>
                            <option>Universidade</option>
                            <option>Trabalho</option>
                            <option>Academia</option>
                        </select>
                    </div>

                    <div className="form-group row">
                        <div className="col-6">
                            <label>Data:</label>
                            <input onChange={(e) => setData(e.target.value)}type="date" className="form-control" value={data} />
                        </div>
                        <div className="col-6">
                            <label>Horário:</label>
                            <input onChange={(e) => setHora(e.target.value)}type="time" className="form-control" value={hora} />
                        </div>
                    </div>

                    <div className='form-group'>
                        <lable>Upload de Imagem</lable>
                        <input onChange={(e) => setImagemNova(e.target.files[0])}type="file" className="form-control" />
                    </div>

                    <div className="row">
                        {
                            carregando ? 
                            <div className="spinner-border text-secondary ms-auto" role="status">
                                <span class="sr-only"></span>
                            </div>
                            : <button onClick={match.params.idPost ? editar : cadastrar} type="button" className="btn btn-lg mt-3 mb-5 btn-cadastro">{ match.params.idPost ? 'Atualizar Post' : 'Cadastrar Post' }</button>
                        }
                    </div>
                    
                </form>

                <div className=" text-center my-5">
                    {msgType === "ok" && <span><strong>Uau!</strong> Post Cadastrado com Sucesso! &#128521;</span>}
                    {msgType === "erro" && <span><strong>Ah!</strong> Erro ao cadastrar o post! &#128533;</span>}                         
                </div>
            </div>
        </>
    );
}

export default NewPost;