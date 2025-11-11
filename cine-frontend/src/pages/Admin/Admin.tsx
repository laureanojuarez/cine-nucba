import {toast} from "sonner";
import {MovieForm} from "../../components/admin/components/MovieForm/MovieForm";
import {MovieList} from "../../components/admin/components/MovieList/MovieList";
import {useFilms} from "../../hooks/Films/useFilms";
import axios from "axios";
import {useState} from "react";

interface EditData {
  title: string;
  genero: string;
  duration: number;
  poster?: string;
}
export default function AdminPage() {
  const {films, loading, error, refetch} = useFilms();
  const [editId, setEditId] = useState<number | null>(null);
  const [editData, setEditData] = useState<EditData>({
    title: "",
    genero: "",
    duration: 0,
    poster: "",
  });

  const handleEditClick = (film: any) => {
    setEditId(film.id);
    setEditData({
      title: film.title,
      genero: film.genero,
      duration: film.duration,
      poster: film.poster,
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: name === "duration" ? Number(value) : value,
    }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/peliculas/${editId}`, editData);
      toast.success("Película actualizada correctamente");
      setEditId(null);
      await refetch();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Error al actualizar la película"
      );
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Estás seguro de eliminar esta película?")) return;

    try {
      await axios.delete(`/peliculas/${id}`);
      toast.success("Película eliminada correctamente");
      await refetch();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Error al eliminar la película"
      );
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-700 py-10 px-2 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-8 text-white text-center">
        Panel de Administración
      </h1>

      <MovieForm onSuccess={refetch} />

      <MovieList
        films={films}
        loading={loading}
        error={error}
        editId={editId}
        editData={editData}
        onEdit={handleEditClick}
        onDelete={handleDelete}
        onEditSubmit={handleEditSubmit}
        onEditChange={handleEditChange}
        onCancelEdit={() => setEditId(null)}
      />
    </div>
  );
}
