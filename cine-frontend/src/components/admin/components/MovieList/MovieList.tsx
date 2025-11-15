import {MovieEditForm} from "./MovieEditForm";
import {MovieItem} from "./MovieItem";

interface Film {
  id: number;
  titulo: string;
  genero: string;
  duracion: number;
  poster?: string;
}

interface MovieListProps {
  films: Film[];
  loading: boolean;
  error: string | null;
  editId: number | null;
  editData: {
    titulo: string;
    genero: string;
    duracion: number;
    poster?: string;
  };
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
    return <div className="text-white text-center">Cargando películas...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  if (films.length === 0) {
    return (
      <div className="text-gray-300 text-center">
        No hay películas registradas.
      </div>
    );
  }

  return (
    <section className="w-full max-w-6xl">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">
        Gestión de películas
      </h2>
      <ul className="space-y-4">
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
    </section>
  );
};
