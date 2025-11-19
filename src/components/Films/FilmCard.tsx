import {Link} from "react-router-dom";
import type { Film } from "../../types";

interface FilmCardProps {
  film: Film;
}

export const FilmCard = ({ film }: FilmCardProps) => {
  return (
    <Link
      to={`/films/${film.id}`}
      className="group relative flex flex-col h-full bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 transition-all duration-300 hover:border-neutral-600 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-1"
    >
      {/* Contenedor de Imagen */}
      <div className="relative aspect-2/3 overflow-hidden">
        <img
          src={film.poster || "/placeholder.jpg"}
          alt={film.titulo}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay gradiente sutil al hacer hover */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badge de Duración */}
        {film.duracion > 0 && (
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md border border-white/10">
            {Math.floor(film.duracion / 60)}h {film.duracion % 60}m
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-3 sm:p-4 flex flex-col grow gap-2">
        <h3 className="font-bold text-white text-sm sm:text-base leading-tight line-clamp-2 group-hover:text-blue-400 transition-colors">
          {film.titulo}
        </h3>
        
        {/* Badges de Formato (Simulados o reales si los tienes en la DB) */}
        <div className="mt-auto flex flex-wrap gap-1.5">
          <span className="text-[10px] font-semibold bg-neutral-800 text-neutral-300 px-1.5 py-0.5 rounded border border-neutral-700">
            2D
          </span>
          <span className="text-[10px] font-semibold bg-blue-900/30 text-blue-300 px-1.5 py-0.5 rounded border border-blue-800/50">
            ATMOS
          </span>
        </div>
      </div>
    </Link>
  );
};