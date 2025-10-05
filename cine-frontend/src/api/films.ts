import axios from "axios";

const API_KEY = "95145abf695701fea57e4211f53dc98e";

export const fetchFilms = async () => {
  try {
    const {data} = await axios.get(
      `https://api.themoviedb.org/3/discover/movie`,
      {
        params: {
          api_key: API_KEY,
        },
      }
    );
    console.log("fetchFilms data:", data);
    console.log("fetchFilms results:", data.results);
    return data.results;
  } catch (error) {
    console.error("Error fetching films:", error);
    return [];
  }
};
