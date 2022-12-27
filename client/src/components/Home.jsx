import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, getGenres, filterGenre } from "../actions";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Card from "./Card";
import Pagination from "./Pagination";
import s from "../styles/Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const genres = useSelector((state) => state.genres);

  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(15);
  const [order, setOrder] = useState("");

  const lastGame = currentPage * gamesPerPage;
  const firstGame = lastGame - gamesPerPage;
  const currentGames = allVideogames.slice(firstGame, lastGame);

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getVideogames());
  }, []);

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  
  return (
    <React.Fragment>


      <Navbar />
      
        <Pagination
          gamesPerPage={gamesPerPage}
          allVideogames={allVideogames.length}
          pagination={pagination}
          />
     
      
          {currentGames?.map((el) => {
            return (
              <div className={s.card}>
                <Link to={"/home/" + el.id}>
                  <Card
                    name={el.name}
                    image={el.image}
                    genres={el.genres.map((g) => {
                      return `${g.name} `;
                    })}
                    key={el.id}
                  ></Card>
                </Link>
              </div> 
            );
          })} 
      
      
    </React.Fragment> 
  );
}
