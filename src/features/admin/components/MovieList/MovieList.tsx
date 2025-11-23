import {MovieEditForm} from "./MovieEditForm";
import {MovieItem} from "./MovieItem";
import type { Film } from "../../../../types";


interface MovieListProps {
  films: Film[];
  loading: boolean;
  error: string | null;
  editId: number | null;
  editData: Film;
  onEdit: (film: Film) => void;
  onDelete: (id: number) => void;
  onEditSubmit: (e: React.FormEvent) => void;
  onEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancelEdit: () => void;
}

export const MovieList = ({
  films,
  loading,
  error,
  editId,
  editData,
  onEdit,
  onDelete,
  onEditSubmit,
  onEditChange,
  onCancelEdit,
}: MovieListProps) => {
  if (loading) {
    return (
      <div className="text-white text-center">Cargando películas...</div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (films.length === 0) {
    return (
      <div className="text-white text-center">
        No hay películas disponibles
      </div>
    );
  }

  return (
    <div className="bg-white/90 rounded-2xl shadow-2xl p-6 w-full max-w-4xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Películas agregadas
      </h2>
      <ul className="space-y-3">
        {films.map((film) =>
          editId === film.id ? (
            <MovieEditForm
              key={film.id}
              editData={editData}
              onSubmit={onEditSubmit}
              onChange={onEditChange}
              onCancel={onCancelEdit}
            />
          ) : (
            <MovieItem
              key={film.id}
              film={film}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          )
        )}
      </ul>
    </div>
  );
};