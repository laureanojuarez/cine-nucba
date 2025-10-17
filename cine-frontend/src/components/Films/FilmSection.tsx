import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    <section className="flex flex-col gap-2">
      <h1 className="font-bold text-2xl">Peliculas en cartelera</h1>
      <ul className="flex flex-wrap gap-4 list-none p-0">
        {films.map((f) => (
          <Link key={f.id} to={`/films/${f.id}`} className="w-61">
            <li className="w-61">
              <figure className="bg-gray-800 rounded overflow-hidden">
                <img
                  src={f.poster || " "}
                  alt={f.title}
                  className="w-full h-auto"
                  loading="lazy"
                />
                <figcaption className="text-center p-2">
                  <div className="font-medium">{f.title}</div>
                  <div className="font-medium">{`Genero: ${f.genero}`}</div>
                </figcaption>
              </figure>
            </li>
          </Link>
        ))}
      </ul>
    </section>
  );
};
