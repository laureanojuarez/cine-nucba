import {create} from "zustand";

interface UIState {
  loginOpen: boolean;
  profileOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  openProfile: () => void;
  closeProfile: () => void;
}

export const useUI = create<UIState>()((set) => ({
  loginOpen: false,
  profileOpen: false,
  openLogin: () => set({loginOpen: true}),
  closeLogin: () => set({loginOpen: false}),
  openProfile: () => set({profileOpen: true}),
  closeProfile: () => set({profileOpen: false}),
}));
