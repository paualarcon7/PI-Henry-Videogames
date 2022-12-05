require('dotenv').config();
const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;

const api = "https://api.rawg.io/api" //games?key=" + API_KEY;

const createVideogame = async (name, description, platforms, genre) => {
  try {
    const newVideogame = await Videogame.create({name, description, platforms});
    const dbGenre = await Genre.findAll({
      where: {
        name: genre,
      }
    }) 
    await newVideogame.addGenre(dbGenre)
  } catch (err) {
    return err;
  }
}

const apiVideogames = async () => {

    try {

    const req1 = await axios.get(`${api}/games?key=${API_KEY}`);
    const req2 = await axios.get(req1.data.next);
    const req3 = await axios.get(req2.data.next);
    const req4 = await axios.get(req3.data.next);
    const req5 = await axios.get(req4.data.next);

    const res1 = await req1.data.results.map((game) => {
      return {
        id: game.id,
        name: game.name,
        description: game.description,
        released: game.released,
        rating: game.rating,
        platforms: game.platforms.map(p => p.platform.name),
        image: game.background_image,
        genre: game.genres.map((g) => g.name),
      };
    });

    const res2 = await req2.data.results.map((game) => {
      return {
        id: game.id,
        name: game.name,
        description: game.description,
        released: game.released,
        rating: game.rating,
        platforms: game.platforms,
        image: game.background_image,
        genre: game.genres.map((g) => g.name),
      };
    });

    const res3 = await req3.data.results.map((game) => {
      return {
        id: game.id,
        name: game.name,
        description: game.description,
        released: game.released,
        rating: game.rating,
        platforms: game.platforms,
        image: game.background_image,
        genre: game.genres.map((g) => g.name),
      };
    });

    const res4 = await req4.data.results.map((game) => {
      return {
        id: game.id,
        name: game.name,
        description: game.description,
        released: game.released,
        rating: game.rating,
        platforms: game.platforms,
        image: game.background_image,
        genre: game.genres.map((g) => g.name),
      };
    });

    const res5 = await req5.data.results.map((game) => {
      return {
        id: game.id,
        name: game.name,
        description: game.description,
        released: game.released,
        rating: game.rating,
        platforms: game.platforms,
        image: game.background_image,
        genre: game.genres.map((g) => g.name),
      };
    });

    const finalResponse = await res1.concat(res2, res3, res4, res5);

    const finalData = await Promise.all(finalResponse).then((data) => data);
    
    return finalData;
  } catch (err) {
    return err;
  } 
}; 

const dbVideogames = async () => {
  try {
    return await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        }
      }
    })
  } catch (err) {
    return err;
  }
}

const allVideogames = async () => {
  try {
    const apiData = await apiVideogames();
    const dbData = await dbVideogames()
    
    const finalData = apiData.concat(dbData)
    return finalData;
  } catch (err) {
    return err;
  }
}

const filterByName = async (name) => {
  try {
    let games = await apiVideogames();
    let gameByName = await games.filter(
      (g) => g.name.toLowerCase() === name.toLowerCase()
    );

    return gameByName;
  } catch (err) {
    return err;
  }
};

const filterById = async (id) => {
  try {
    const videogames = await allVideogames();
    if(id) {
      const videogameId = await videogames.filter(v => v.id == id)

      return videogameId
    }
  } catch (err) {
    return err;
  }
} 

const getGenres = async () => {
  try {
    const apiGenres = await axios.get(`${api}/genres?key=${API_KEY}`)
    const genres = apiGenres.data.results.map((g) => g.name);
    await genres.forEach(async (el) => {
      await Genre.findOrCreate({
        where: { name: el},
      })
    });

    const allGenres = await Genre.findAll();
    return allGenres;
  } catch (err){
    return err;
  }
}


module.exports = {
  allVideogames,
  filterByName,
  createVideogame,
  getGenres,
  filterById
};