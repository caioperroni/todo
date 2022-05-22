import Login from "./components/Login";
import Join from "./components/Join";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Theme = require("./components/Theme");
const theme = createTheme(Theme.config);

function getToken() {
  const tokenString = sessionStorage.getItem("token");
  return tokenString;
}

function App() {
  const token = getToken();
  if (!token) {
    if (window.location.pathname === "/join") return <Join />;
    else return <Login />;
  }
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="join" element={<Join />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="dash" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
