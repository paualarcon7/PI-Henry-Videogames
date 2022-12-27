import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, filterGenre, filterCreated, orderByName, orderByRating } from "../actions";
import s from "../styles/Navbar.module.css";

export default function Navbar() {
  const dispatch = useDispatch();

  const genres = useSelector((state) => state.genres);
  useEffect(() => {
    dispatch(getGenres());
  }, []);

  function handleGenreFilter(e) {
    e.preventDefault();
    dispatch(filterGenre(e.target.innerText));
  }

  function handleCreatedFilter(e){
    e.preventDefault();
    dispatch(filterCreated(e.target.innerText))
  }
  
  

  function handleSortByName(e){
    //e.preventDefault();
    dispatch(orderByName(e.target.innerText))
    
  }

  function handleSortByRating(e){
    dispatch(orderByRating(e.target.innerText))
  }

  return (
    <div class={s.dropdown}>
      <nav>
        <a href="/home">
          <img class={s.logo} src="pacman-banner.jpg" />
        </a>
        <ul>
          <li>
            <a href="/home" class={s.principalFont}>
              Home
            </a>
          </li>
          <li>
            <a href="#" class={s.principalFont}>
              Generos
            </a>
            <ul class={s.secondaryFont}>
              {genres.map((g) => {
                return <li onClick={(e) => handleGenreFilter(e)}>{g.name}</li>;
              })}
            </ul>
          </li>
          <li >
            <a href="#" class={s.principalFont}>
              Tus juegos
            </a>
            <ul class={s.secondaryFont}>
              <li onClick={(e) => handleCreatedFilter(e)}>Creados por ti</li>
              <li>Crear nuevo juego</li>
            </ul>
          </li>
          <li>
            <a href="#" class={s.principalFont}>
              Orden
            </a>
            <ul class={s.secondaryFont}>
              <li onClick={(e) => handleSortByName(e)}>Ascendente A-Z</li>
              <hr />
              <li onClick={(e) => handleSortByName(e)}>Descendente Z-A</li>
              <hr />
              <li onClick={(e) => handleSortByRating(e)}>Mayor Rating</li>
              <hr />
              <li onClick={(e) => handleSortByRating(e)}>Menor Rating</li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
