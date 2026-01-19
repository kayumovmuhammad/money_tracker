import { Navigate } from "react-router-dom";
import useAuth from "../contexts/AuthContext";
import GoogleIcon from "../ui-components/icons/GoogleIcon";

export default function SignInPage() {
  const { signInWithGoogle, isAuth } = useAuth();

  if (isAuth) {
    return <Navigate to="/" replace></Navigate>;
  }

  return (
    <div class="flex justify-center items-center h-screen">
      <div className="bg-gray-400 flex-col gap-3 p-5 m-5 w-100 flex justify-center items-center rounded-2xl">
        <button
          onClick={signInWithGoogle}
          className="cursor-pointer text-black flex gap-2 items-center bg-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-zinc-300 transition-all ease-in duration-200"
        >
          <GoogleIcon></GoogleIcon>
          Continue with Google
        </button>
      </div>
    </div>
  );
}
