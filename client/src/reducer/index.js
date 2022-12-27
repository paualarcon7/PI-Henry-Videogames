import {
  GET_GENRES,
  GET_VIDEOGAMES,
  FILTER_GENRE,
  FILTER_CREATED,
  ORDER_BY_NAME,
  ORDER_BY_RATING,
} from "../actionTypes";

const initialState = {
  videogames: [], //estado que se va a ir modif en base al FILTRADO
  allVideogames: [], //estado que SIEMPRE va a tener todos los juegos
  genres: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
      };

    case GET_GENRES:
      return {
        ...state,
        genres: action.payload.sort(function (a, b) {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          if (b.name.toLowerCase() > a.name.toLowerCase()) {
            return -1;
          }
          return 0;
        }),
      };
    case FILTER_GENRE:
      const allVideogames = state.allVideogames;
      const filtered = [];

      allVideogames.forEach((game) => {
        game.genre.forEach((genre) => {
          if (genre === action.payload) filtered.push(game);
        });
      });

      return {
        ...state,
        videogames: filtered,
      };
    case FILTER_CREATED:
      const allGames = state.allVideogames;
      const createdFilter =
        action.payload === "Creados por ti"
          ? allGames.filter((g) => g.createdDb)
          : allGames.filter((g) => !g.createdDb);

      return {
        ...state,
        videogames: createdFilter,
      };
    case ORDER_BY_NAME:
      const sorted =
        action.payload === "Ascendente A-Z"
          ? [...state.videogames].sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : [...state.videogames].sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: sorted,
      };
    case ORDER_BY_RATING:
      const ratingSorted =
        action.payload === "Mayor Rating"
          ? [...state.videogames].sort(function (a, b) {
              if (a.rating > b.rating) return -1;
              if (b.rating > a.rating) return 1;
              return 0;
            })
          : [...state.videogames].sort(function (a, b) {
              if (a.rating > b.rating) return 1;
              if (b.rating > a.rating) return -1;
              return 0;
            });
            return {
              ...state,
              videogames: ratingSorted,
            };

    default:
      return state;
  }
}
