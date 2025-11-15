import {Link} from "react-router-dom";
import type {Film} from "../../hooks/Films/useFilms";

interface FilmCardProps {
  film: Film;
}

export const FilmCard = ({film}: FilmCardProps) => {
  return (
    <Link
      className="group bg-stone-900 rounded-xl shadow-lg overflow-hidden border border-gray-700 h-full flex flex-col hover:border-gray-600 transition"
      to={`/films/${film.id}`}
    >
      <div className="relative aspect-2/3">
        <img
          src={film.poster || "/placeholder.jpg"}
          alt={film.titulo}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />
        {film.duracion ? (
          <span className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {Math.floor(film.duracion / 60)}h {film.duracion % 60}m
          </span>
        ) : null}
      </div>

      {/* Contenido */}
      <div className="p-4 flex flex-col gap-2">
        <div className="font-bold text-white text-sm sm:text-base">
          <span className="line-clamp-2">{film.titulo}</span>
        </div>
        <div className="text-xs text-white/80 font-semibold">
          2D · 4D E-MOTION · D-BOX
        </div>
      </div>
    </Link>
  );
};
