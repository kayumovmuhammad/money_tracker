import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import SignInPage from "./pages/SingIn";
import HomePage from "./pages/Home";
import SettingsPage from "./pages/Settings";
import useAuth from "./contexts/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useEffect } from "react";
import useTransactions from "./contexts/TransactionsContext";

import LandingPage from "./pages/LandingPage";

function App() {
  const { setUser, isAuth, user } = useAuth();
  const { loadTransactions } = useTransactions();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("user1 => ", user);
      setUser(user);
      loadTransactions(user.accessToken);
    });

    return () => unsubscribe();
  }, [setUser]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<HomePage></HomePage>}></Route>
        <Route path="/login" element={<SignInPage></SignInPage>}></Route>
        <Route path="/settings" element={<SettingsPage></SettingsPage>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
