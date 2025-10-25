import {Link} from "react-router-dom";

interface FilmCardProps {
  film: {
    id: number;
    title: string;
    poster: string;
    duration: number;
  };
}

export const FilmCard = ({film}: FilmCardProps) => {
  return (
    <Link
      className="bg-stone-900 rounded-xl shadow-lg overflow-hidden border border-gray-700 w-72 flex flex-col"
      to={`/films/${film.id}`}
    >
      <div className="relative">
        <img
          src={film.poster || "/placeholder.jpg"}
          alt={film.title}
          className="w-full  object-cover"
          loading="lazy"
        />
        <span className="absolute top-3 right-3 bg-gray-800 text-white text-xs px-2 py-1 rounded">
          {film.duration
            ? `${Math.floor(film.duration / 60)}h ${film.duration % 60}m`
            : ""}
        </span>
      </div>
      <div className="p-4">
        <div className="font-bold text-white text-base mb-2 flex items-center gap-2">
          {film.title}
          <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
            {/* +13 o clasificación */}
          </span>
        </div>
        <div className="text-xs text-white font-semibold mb-2">
          2D · 4D E-MOTION · D-BOX
        </div>
      </div>
    </Link>
  );
};
