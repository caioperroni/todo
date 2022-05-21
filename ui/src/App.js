import Login from "./components/Login";
import Join from "./components/Join";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function getToken() {
  const tokenString = sessionStorage.getItem("token");
  return tokenString;
}

function App() {
  const token = getToken();
  if (!token) {
    console.log(window.location.pathname);
    if (window.location.pathname === "/join") return <Join />;
    else return <Login />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="join" element={<Join />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="dash" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
