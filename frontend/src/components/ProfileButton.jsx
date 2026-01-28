import { useState } from "react";
import { User } from "lucide-react";
import Button from "../ui-components/Button";
import useAuth from "../contexts/AuthContext";

export default function ProfileButton() {
  const [showAuth, setShowAuth] = useState(false);
  const { signInWithGoogle, isAuth, signOut, user } = useAuth();

  const onSignInClick = () => {
    setShowAuth(false);
    signInWithGoogle();
  };

  const onSignOutClick = () => {
    console.log("Hello");
    setShowAuth(false);
    signOut();
  };

  return (
    <div
      className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center cursor-pointer relative"
      onClick={() => setShowAuth(!showAuth)}
    >
      <div className="w-full h-full rounded-xl overflow-hidden flex justify-center items-center">
        {!isAuth ? <User size={20} /> : <img src={user.photoURL} />}
      </div>
      {showAuth && (
        <div
          className="absolute flex flex-col w-max top-12.5 right-0 bg-card rounded-xl p-2.5 shadow-[0_10px_20px_rgba(0,0,0,0.1)] border border-border z-100"
          onClick={(e) => e.stopPropagation()}
        >
          {!isAuth && (
            <Button
              variant="ghost"
              className="w-full justify-start p-2 font-semibold text-text hover:bg-bg rounded"
              onClick={onSignInClick}
            >
              Sign in with Google
            </Button>
          )}
          {isAuth && (
            <>
              <Button
                variant="ghost"
                className="justify-start p-2 font-semibold hover:bg-bg rounded"
              >
                {user.displayName}
              </Button>
              <Button
                variant="danger"
                className="w-full justify-start p-2 font-semibold hover:bg-bg rounded"
                onClick={onSignOutClick}
              >
                Sign Out
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
