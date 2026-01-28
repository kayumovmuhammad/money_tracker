import { create } from "zustand";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";

const useAuth = create((set) => ({
  user: null,
  isAuth: false,
  setUser: (user) => set({ user, isAuth: !!user }),
  signInWithGoogle: async () => {
    const provider = new GoogleAuthProvider();
    try {
      await setPersistence(auth, browserLocalPersistence);
      const result = await signInWithPopup(auth, provider);
      axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { token: result.user.accessToken }).then((res) => { console.log(res) });
    } catch (error) {
      console.log(error);
    }
  },
  signOut: async () => {
    try {
      await signOut(auth);
      set({ user: null, isAuth: false });
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useAuth;
