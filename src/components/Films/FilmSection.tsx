import {FilmCard} from "./FilmCard";
import {useFilms} from "../../hooks/Films/useFilms";

export const FilmSection = () => {
  const {films, loading} = useFilms();

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        {loading ? (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 sm:gap-6">
            {Array.from({length: 8}).map((_, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden bg-neutral-800 border border-neutral-700 animate-pulse h-full"
              >
                <div className="aspect-2/3 bg-neutral-700" />
                <div className="p-3 space-y-2">
                  <div className="h-4 bg-neutral-700 rounded w-3/4" />
                  <div className="h-3 bg-neutral-700 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : films.length === 0 ? (
          <section className="text-white/80 text-lg h-72 flex items-center justify-center bg-neutral-800/40 rounded-xl border border-neutral-700">
            No hay películas disponibles en este momento.
          </section>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 sm:gap-6 items-stretch">
            {films.map((f) => (
              <div key={f.id} className="h-full">
                <FilmCard film={f} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
