import {toast} from "sonner";
import {MovieForm} from "../../components/admin/components/MovieForm/MovieForm";
import {useFilms} from "../../hooks/Films/useFilms";
import axios from "axios";
import {useState} from "react";
import { SalaForm } from "../../components/admin/components/SalaForm/SalaForm";
import { FuncionForm } from "../../components/admin/components/FuncionForm";
import { MovieList } from "../../components/admin/components/MovieList/MovieList";
import type { Film } from "../../types"

export default function AdminPage() {
  const {films, loading, error, refetch} = useFilms();
  const [editId, setEditId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Film>({
    id: 0,
    titulo: "",
    genero: "",
    duracion: 0,
    poster: "",
  });

  const handleEditClick = (film: Film) => {
    setEditId(film.id);
    setEditData(film);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: name === "duracion" ? Number(value) : value,
    }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId) return;
    try {
      await axios.put(`/peliculas/${editId}`, editData);
      toast.success("Película actualizada correctamente");
      setEditId(null);
      setEditData({
        id: 0,
        titulo: "",
        genero: "",
        duracion: 0,
        poster: "",
      });
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

  const handleCancelEdit = () => {
    setEditId(null);
    setEditData({
      id: 0,
      titulo: "",
      genero: "",
      duracion: 0,
      poster: "",
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-700 py-10 px-4 flex flex-col items-center gap-8">
      <h1 className="text-4xl font-extrabold text-white text-center">
        Panel de Administración
      </h1>

      <MovieForm onSuccess={refetch} />
      <SalaForm/>
      <FuncionForm/>

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
        onCancelEdit={handleCancelEdit}
      />
    </div>
  );
}