import {create} from "zustand";

interface User {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  fechaNacimiento: string;
  genero: string;
  role: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  setToken: (token: string) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  token: localStorage.getItem("token") || null,
  user: null,

  setToken: (token) => {
    localStorage.setItem("token", token);
    set({token});
  },

  setUser: (user) => {
    set({user});
  },

  logout: () => {
    localStorage.removeItem("token");
    set({token: null, user: null});
  },
}));
