import {toast} from "sonner";
import {MovieForm} from "../../features/admin/components/MovieForm/MovieForm";
import {useFilms} from "../../hooks/Films/useFilms";
import axios from "axios";
import {useState} from "react";
import { SalaForm } from "../../features/admin/components/SalaForm/SalaForm";
import { FuncionForm } from "../../features/admin/components/FuncionForm";
import { MovieList } from "../../features/admin/components/MovieList/MovieList";
import type { Film as FilmType } from "../../types"
import { Armchair, Calendar, Film, LayoutDashboard } from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"movies" | "salas" | "funciones">("movies");
  const {films, loading, error, refetch} = useFilms();
  const [editId, setEditId] = useState<number | null>(null);
  const [editData, setEditData] = useState<FilmType>({
    id: 0,
    titulo: "",
    genero: "",
    duracion: 0,
    poster: "",
  });

  const handleEditClick = (film: FilmType) => {
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
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
      {/* Header / Navbar */}
      <header className="bg-gray-900/50 backdrop-blur-md border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-6 h-6 text-green-400" />
              <h1 className="text-xl font-bold">Panel de Administración</h1>
            </div>
            
            {/* Navegación de Tabs */}
            <nav className="flex space-x-4 overflow-x-auto pb-2">
              <TabButton 
                active={activeTab === "movies"} 
                onClick={() => setActiveTab("movies")}
                icon={<Film className="w-4 h-4" />}
                label="Películas"
              />
              <TabButton 
                active={activeTab === "salas"} 
                onClick={() => setActiveTab("salas")}
                icon={<Armchair className="w-4 h-4" />}
                label="Salas"
              />
              <TabButton 
                active={activeTab === "funciones"} 
                onClick={() => setActiveTab("funciones")}
                icon={<Calendar className="w-4 h-4" />}
                label="Funciones"
              />
            </nav>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Tab: Películas */}
          {activeTab === "movies" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Columna Izquierda: Formulario */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24">
                    <MovieForm onSuccess={refetch} />
                  </div>
                </div>
                
                {/* Columna Derecha: Lista */}
                <div className="lg:col-span-2">
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
              </div>
            </div>
          )}

          {/* Tab: Salas */}
          {activeTab === "salas" && (
            <div className="max-w-2xl mx-auto">
              <SalaForm />
              {/* Aquí podrías agregar una lista de salas en el futuro */}
            </div>
          )}

          {/* Tab: Funciones */}
          {activeTab === "funciones" && (
            <div className="max-w-4xl mx-auto">
              <FuncionForm />
              {/* Aquí podrías agregar una lista de funciones activas */}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

const TabButton = ({ active, onClick, icon, label }: any) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm
      ${active 
        ? "bg-green-500/20 text-green-400 border border-green-500/50" 
        : "text-gray-400 hover:text-white hover:bg-gray-800"
      }`}
  >
    {icon}
    {label}
  </button>
);