import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Join from "./components/Join";
import Login from "./components/Login";
import { genOptions } from "./context/AppContext";

const Theme = require("./components/Theme");
const theme = createTheme(Theme.config);
let doFetch = true;

function App() {
  const [valid, setValid] = useState(false);
  const token = sessionStorage.getItem("token");
  const body = {
    token,
  };
  if (doFetch) {
    fetch(
      process.env.REACT_APP_BASE + "/api/user/token",
      genOptions(body)
    ).then((res) => {
      if (res.status === 500) {
        setValid(false);
      } else {
        setValid(true);
      }
    });
  }
  if (!valid) {
    if (window.location.pathname === "/join") return <Join />;
    else return <Login />;
  } else {
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
}

export default App;
