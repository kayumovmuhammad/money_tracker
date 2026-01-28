import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import SignInPage from "./pages/SingIn";
import HomePage from "./pages/Home";
import useAuth from "./contexts/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useEffect } from "react";
import useTransactions from "./contexts/TransactionsContext";

function App() {
  const { setUser, isAuth, user } = useAuth();
  const { loadTransactions } = useTransactions();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("user1 => ", user);
      setUser(user);
    });

    return () => unsubscribe();
  }, [setUser]);

  useEffect(() => {
    if (isAuth) {
      loadTransactions(user.accessToken);
    }
  }, [isAuth]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/login" element={<SignInPage></SignInPage>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
