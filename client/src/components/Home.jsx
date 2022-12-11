import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { getVideogames } from "../actions";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import s from '../styles/Home.module.css'

export default function Home () {

    const dispatch = useDispatch()
    const allVideogames = useSelector((state) => state.videogames)

    useEffect(() => {
        dispatch(getVideogames())
    },[])

    function handleClick(e){
        e.preventDefault();
        dispatch(getVideogames())
    }
    return (
        <React.Fragment>
            <Navbar></Navbar>
           
        </React.Fragment>
    )

}