import React from "react";
import { Link } from "react-router-dom";
import s from '../styles/LandingPage.module.css'

export default function LandingPage() {
    return (
        <div class={s.LandingPage}>
            <h1>Bienvenid@!</h1>
            <h2>La más variada página de juegos</h2>
            <h2>↓↓↓↓↓ ¿Estás listo? ↓↓↓↓↓ </h2>
            <Link to= '/home'>
                <button>Start</button>
            </Link>
        </div>
    )
}