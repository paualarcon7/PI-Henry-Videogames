import { GET_GENRES, GET_VIDEOGAMES } from '../actionTypes'

const initialState = {
  videogames: [],
  genres: [],
};

export default function reducer(state = initialState, action) {
  switch ((action.type)) {

    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
      };

      case GET_GENRES: 
      return {
        ...state,
        genres: action.payload.sort (function (a, b) {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return 1;
            }
            if (b.name.toLowerCase() > a.name.toLowerCase()) {
              return -1;
            }
            return 0;
          })
      };
    default:
      return state;
  }
  
}
