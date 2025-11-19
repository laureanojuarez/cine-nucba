import {FilmCard} from "./FilmCard";
import {useFilms} from "../../hooks/Films/useFilms";

export const FilmSection = () => {
  const {films, loading} = useFilms();

 const LoadingSkeleton = () => (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="relative rounded-xl overflow-hidden bg-neutral-800/50 border border-neutral-700/50 animate-pulse"
        >
          <div className="aspect-2/3 bg-neutral-800" />
          <div className="p-3 space-y-2">
            <div className="h-4 bg-neutral-700 rounded w-3/4" />
            <div className="h-3 bg-neutral-700 rounded w-1/2" />
          </div>
        </div>
      ))}
    </>
  );
  return (
   <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 xl:gap-8">
          
          {loading ? (
            <LoadingSkeleton />
          ) : films.length === 0 ? (
            <div className="col-span-full h-64 flex flex-col items-center justify-center bg-neutral-800/30 rounded-2xl border border-neutral-700/50 text-neutral-400">
              <span className="text-4xl mb-2">🎬</span>
              <p>No hay películas en cartelera.</p>
            </div>
          ) : (
            films.map((f) => <FilmCard key={f.id} film={f} />)
          )}
          
        </div>
      </div>
    </section>
  );
};