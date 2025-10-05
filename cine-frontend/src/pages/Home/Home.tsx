import {useEffect, useState} from "react";
import {fetchFilms} from "../../api/films";

export default function App() {
  const [films, setFilms] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const results = await fetchFilms();
      console.log("fetchFilms (desde App):", results);
      setFilms(results || []);
    };
    load();
  }, []);

  return (
    <main className="">
      <section className="flex flex-col gap-2">
        <h1 className="font-bold text-2xl">Peliculas en cartelera</h1>
        <ul className="flex flex-wrap gap-4 list-none p-0">
          {films.map((f) => (
            <li key={f.id} className="w-61">
              <figure className="bg-gray-800 rounded overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${f.poster_path}`}
                  alt={f.title}
                  className="w-full h-auto"
                  loading="lazy"
                />
                <figcaption className="text-center p-2">
                  <div className="font-medium">{f.title}</div>
                  <div className="text-sm text-gray-300">
                    {f.release_date ?? "—"} · {f.vote_average ?? "—"}
                  </div>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
