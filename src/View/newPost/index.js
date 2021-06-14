import React, {useState} from "react";
import { useSelector } from "react-redux";
import "./newPost.css";
import {Link} from "react-router-dom";
import NavBar from "../../components/navbar";
import firebase from "../../config/firebase";

function NewPost(){

    const [msgType, setMsgType] = useState();
    const [titulo, setTitulo] = useState();
    const [tipo, setTipo] = useState();
    const [descricao, setDescricao] = useState();
    const [data, setData] = useState();
    const [hora, setHora] = useState();
    const [imagem, setImagem] = useState();
    const userEmail = useSelector(state => state.userEmail);
    const [carregando, setCarregando] = useState(0);

    const storage = firebase.storage();
    const db = firebase.firestore();

    function cadastrar(){

        setCarregando(1);

        storage.ref(`imagens/${imagem.name}`).put(imagem).then(() => {
            db.collection(`posts`).add({
                titulo: titulo,
                tipo: tipo,
                descricao: descricao,
                data: data,
                hora: hora,
                image: imagem.name,
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
                    <h3 className="row-auto font-weight-bold">Novo Post</h3>
                </div>

                <form>
                    <div className="form-group mb-2">
                        <label>Título</label>
                        <input onChange={(e) => setTitulo(e.target.value)} type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Descripção do Post</label>
                        <textarea onChange={(e) => setDescricao(e.target.value)}className="form-control" rows="4"></textarea>
                    </div>

                    <div className="form-group">
                        <label>Selecione a Categoria do Post</label>
                        <select onChange={(e) => setTipo(e.target.value)}className="form-control">
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
                            <input onChange={(e) => setData(e.target.value)}type="date" className="form-control" />
                        </div>
                        <div className="col-6">
                            <label>Horário:</label>
                            <input onChange={(e) => setHora(e.target.value)}type="time" className="form-control" />
                        </div>
                    </div>

                    <div className='form-group'>
                        <lable>Upload de Imagem</lable>
                        <input onChange={(e) => setImagem(e.target.files[0])}type="file" className="form-control" />
                    </div>

                    <div className="row">
                        {
                            carregando ? 
                            <div className="spinner-border text-secondary ms-auto" role="status">
                                <span class="sr-only"></span>
                            </div>
                            : <button onClick={cadastrar} type="button" className="btn btn-lg mt-3 mb-5 btn-cadastro">Cadastrar Post</button>
                        }
                    </div>
                    
                </form>

                <div className=" text-center my-5">
                    {msgType == "ok" && <span><strong>Uau!</strong> Post Cadastrado com Sucesso! &#128521;</span>}
                    {msgType == "erro" && <span><strong>Ah!</strong> Erro ao cadastrar o post! &#128533;</span>}                         
                </div>
            </div>
        </>
    );
}

export default NewPost;