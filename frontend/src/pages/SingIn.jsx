import { Navigate } from "react-router-dom";
import useAuth from "../contexts/AuthContext";
import GoogleIcon from "../ui-components/icons/GoogleIcon";

export default function SignInPage() {
  const { signInWithGoogle, isAuth } = useAuth();

  if (isAuth) {
    return <Navigate to="/dashboard" replace></Navigate>;
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl ring-1 ring-slate-100">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-slate-600">
            Sign in to manage your finances with Money Tracker
          </p>
        </div>

        <button
          onClick={signInWithGoogle}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-6 py-4 text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2 active:scale-[0.98]"
        >
          <GoogleIcon />
          <span className="text-base font-medium">Continue with Google</span>
        </button>

        <div className="mt-8 text-center text-sm text-slate-400">
          <p>Secure authentication powered by Google</p>
        </div>
      </div>
    </div>
  );
}
