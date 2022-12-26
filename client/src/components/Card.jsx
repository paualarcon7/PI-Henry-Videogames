import React from "react";
import s from "../styles/Card.module.css"

export default function Card ({image, name, genres}) {
    return (
        <div className={s.container}>
            <div className={s.card}>
            <img src={image} alt=""/>
            <div className={s.details}>
            <h1>{name}</h1>
            <p>{genres}</p>
            </div>
            </div>
        </div>
    )
}