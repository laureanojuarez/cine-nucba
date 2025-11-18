import axios from "axios";
import {create} from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";

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

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,

      setToken: (token) => {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        set({token});
      },

      setUser: (user) => {
        set({user});
      },

      logout: () => {
        delete axios.defaults.headers.common.Authorization;
        set({token: null, user: null});
      },
    }),

    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          axios.defaults.headers.common.Authorization = `Bearer ${state.token}`;
        }
      },
    }
  )
);
