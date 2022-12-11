import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../actions";
import s from "../styles/Navbar.module.css";

export default function Navbar() {
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);
    useEffect(() => {
        dispatch(getGenres());
      }, []);

  return (
    <div class={s.dropdown}>
      <nav>
      <a href="/home"><img class={s.logo} src="pacman-banner.jpg"/></a>
        <ul>
          <li>
            <a href="/home" class={s.principalFont}>Home</a>
          </li>
          <li>
            <a href="#" class={s.principalFont}>Generos</a>
            <ul class={s.secondaryFont}>
            {genres.map((g) => {
                return <li>{g.name}<hr/></li>
                
            })}
            </ul>
          </li>
          <li>
            <a href="#" class={s.principalFont}>Tus juegos</a>
            <ul class={s.secondaryFont}>
              <li>Juegos existentes</li>
            </ul>
          </li>
          <li>
            <a href="#" class={s.principalFont}>Orden</a>
            <ul class={s.secondaryFont}>
              <li>Ascendente A-Z</li>
              <hr/>
              <li>Descendente Z-A</li>
              <hr/>
              <li>Mayor Rating</li>
              <hr/>
              <li>Menor Rating</li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
