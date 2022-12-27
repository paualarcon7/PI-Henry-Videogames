import axios from 'axios'
import { GET_VIDEOGAMES, GET_GENRES, FILTER_GENRE, FILTER_CREATED, ORDER_BY_NAME, ORDER_BY_RATING } from '../actionTypes'



export function getVideogames(){
    return async function(dispatch) {
        var json = await axios.get("http://localhost:3001/videogames")
        return dispatch ({
            type: GET_VIDEOGAMES,
            payload: json.data
        })
    }

}

export function getGenres(){
    return async function(dispatch) {
        var json = await axios.get("http://localhost:3001/genres")
        return dispatch ({
            type: GET_GENRES,
            payload: json.data
        })
    }
}

export function filterGenre(payload){
    return {
        type: FILTER_GENRE,
        payload
    }
}

export function filterCreated(payload){
    return {
        type: FILTER_CREATED,
        payload
    }
}

export function orderByName(payload){
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function orderByRating(payload){
    return {
        type: ORDER_BY_RATING,
        payload
    }
}

