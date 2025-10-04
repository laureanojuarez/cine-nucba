import api from "./axios.js";

export const fetchFilms = async () => {
  try {
    const response = await api.get("/api/films");
    return response.data;
  } catch (error) {
    console.error("Error fetching films:", error);
    throw new Error("Error al cargar películas");
  }
};

export const fetchFilmById = async (id) => {
  try {
    const response = await api.get(`/api/films/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching film by id:", error);

    if (error.response?.status === 404) {
      throw new Error("Película no encontrada");
    }
    throw new Error("Error al cargar película");
  }
};
