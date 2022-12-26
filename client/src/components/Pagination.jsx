import { React } from "react";
import s from "../styles/Pagination.module.css"

export default function Pagination({gamesPerPage, allVideogames, pagination}) {

    const pages = []
 
    for (let i = 1; i <= Math.ceil(allVideogames/gamesPerPage); i++){
        pages.push(i)
    }

    return (
        
        <div className={s.div}>
            
                {pages && 
                pages.map(num => (
                    <button key={num}>
                        <a onClick={() => pagination(num)}>{num}</a>
                    </button>
                ))}
                
        </div>
        
    )
    


    

}