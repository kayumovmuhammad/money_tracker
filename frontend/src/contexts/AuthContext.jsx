import { create } from "zustand";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { persist } from "zustand/middleware";

const useAuth = create(
  persist(
    (set) => ({
      user: {},
      isAuth: false,
      signInWithGoogle: () => {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
          .then((result) => {
            console.log(result.user);
            set({ user: result.user, isAuth: true });
          })
          .catch((error) => {
            console.log(error);
          });
      },
    }),
    { name: "auth" },
  ),
);

export default useAuth;
