import React, {useState} from "react";
import "./home.css";
import {Link} from "react-router-dom";
import { useSelector } from 'react-redux';

import NavBar from "../../components/navbar";
import { STATEMENT_OR_BLOCK_KEYS } from "@babel/types";

function Home() {
    return(
        <>
       <NavBar />
       <h1>{useSelector(state => state.userEmail)}</h1>
       </>
    );
}

export default Home;