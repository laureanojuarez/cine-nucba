import axios from "axios";

const API_KEY = import.meta.env.TMDB_API_KEY;
const LANGUAGE = "es-ES";

export const fetchFilms = async () => {
  try {
    const {data} = await axios.get(
      `https://api.themoviedb.org/3/discover/movie`,
      {
        params: {
          api_key: API_KEY,
          language: LANGUAGE,
        },
      }
    );
    return data.results;
  } catch (error) {
    console.error("Error fetching films:", error);
    return [];
  }
};

export const fetchFilmById = async (id: string) => {
  try {
    const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      params: {
        api_key: API_KEY,
        language: LANGUAGE,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching film by id:", error);
    throw error;
  }
};
