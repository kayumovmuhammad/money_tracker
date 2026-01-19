import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import SignInPage from "./pages/SingIn";
import HomePage from "./pages/Home";

function App() {
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
