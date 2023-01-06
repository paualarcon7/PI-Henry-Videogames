import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getGenres, postVideogame } from "../actions";
import s from "../styles/Create.module.css";

export default function VideogameCreation() {
  const dispatch = useDispatch();
  const history = useHistory(); //redirige a una ruta especifica
  const genres = useSelector((state) => state.genres);

  const [input, setInput] = useState({
    name: "",
    genres: [],
    description: "",
    platforms: [],
    released: "",
    rating: "",
  });

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  function handleOnChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleGenreSelect(e) {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value], //concatena en un arreglo el estado input que ya tenia y todo lo que se vaya seleccionando
    });
  }

  function handlePlatformSelect(e) {
    setInput({
      ...input,
      platforms: [...input.platforms, e.target.value],
      
    });
  }

  function handleRatingSelect(e) {
    setInput({
      ...input,
      rating: [...input.rating, e.target.value],
    });
  }

  function handleDelete(el) {
    setInput({
      ...input,
      genres: input.genres.filter((g) => g !== el),
      platforms: input.platforms.filter((p) => p !== el),
      rating: input.rating.filter((r) => r !== el),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postVideogame(input));
    console.log(input)

    alert("Juego creado correctamente!");
    setInput({
      name: "",
      genres: [],
      description: "",
      platforms: [],
      released: "",
      rating: "",
    });
    history.push("/home");
  }

  return (
    <>
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <h1>Crea tu propio juego!</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={s}>
          <label>Nombre: </label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleOnChange(e)}
          ></input>
        </div>

        <label>Géneros: </label>
        <select onChange={(e) => handleGenreSelect(e)}>
          {genres.map((g) => {
            return <option value={g.name}>{g.name}</option>;
          })}
        </select>

        <div>
          <label>Descripción: </label>
          <input
            type="text"
            value={input.description}
            name="description"
            onChange={(e) => handleOnChange(e)}
          ></input>
        </div>

        <div>
          <label>Fecha de lanzamiento:</label>

          <input
            type="date"
            onChange={(e) => handleOnChange(e)}
            name="released"
            value={input.released}
            min="2010-01-01"
            max="2023-12-31"
          />
        </div>

        <div>
          <label>Rating: </label>
          <select
            onChange={(e) => handleRatingSelect(e)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <div>
          <label>Plataformas: </label>
          <select
            
            name="platforms"
            onChange={(e) => handlePlatformSelect(e)}
          >
            <option value="PC">PC</option>
            <option value="Linux">Linux</option>
            <option value="macOS">macOS</option>
            <option value="Android">Android</option>
            <option value="iOs">iOs</option>
            <option value="PS2">PlayStation 2</option>
            <option value="PS3">PlayStation 3</option>
            <option value="PS4">PlayStation 4</option>
            <option value="PS5">PlayStation 5</option>
            <option value="XOne">Xbox One</option>
            <option value="360">Xbox 360</option>
            <option value="S/X">Xbox Series S/X</option>
            <option value="Vita">PS Vita</option>
            <option value="Switch">Nintendo Switch</option>
          </select>
        </div>

        <button type="submit"> Crear </button>
      </form>

      {input.genres.map((el) => (
        <div className={s}>
          <h3 >{el}</h3>
          <button onClick={() => handleDelete(el)}>x</button>
        </div>
      ))}
      
    </>
  );
}
