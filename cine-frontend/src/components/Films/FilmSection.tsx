import axios from "axios";
import {useEffect, useState} from "react";
import {FilmCard} from "./FilmCard";

export const FilmSection = () => {
  const [films, setFilms] = useState<any[]>([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const {data} = await axios.get(`${API_URL}/peliculas`);
        setFilms(data);
      } catch (error) {
        console.error("Error fetching films:", error);
      }
    };
    fetchFilms();
  }, [API_URL]);

  return (
    <section className="flex flex-col gap-6 items-center p-4">
      <h1 className="font-bold text-4xl py-4 text-white">
        Peliculas en cartelera
      </h1>
      {films.length === 0 ? (
        <section className="text-white text-xl h-96 flex items-center justify-center">
          No hay peliculas disponibles en este momento.
        </section>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 w-full max-w-5xl">
          {films.map((f) => (
            <FilmCard key={f.id} film={f} />
          ))}
        </div>
      )}
    </section>
  );
};
