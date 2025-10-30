import axios from "axios";
import {useEffect, useState} from "react";
import {FilmCard} from "./FilmCard";

export const FilmSection = () => {
  const [films, setFilms] = useState<any[]>([]);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await axios.get("http://localhost:3000/peliculas");
        setFilms(response.data);
      } catch (error) {
        console.error("Error fetching films:", error);
      }
    };
    fetchFilms();
  }, []);

  return (
    <section className="flex flex-col gap-6 items-center p-4 ">
      <h1 className="font-bold text-4xl py-4 text-white">
        Peliculas en cartelera
      </h1>
      {films.length === 0 ? (
        <div className="text-white text-xl">No hay peliculas disponibles</div>
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
