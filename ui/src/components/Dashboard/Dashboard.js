import AccountCircle from "@mui/icons-material/AccountCircle";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Fragment, useState } from "react";
import logo from "../../logo.svg";
import NewProject from "../NewProject";
import TaskList from "../TaskList";

function logout() {
  sessionStorage.removeItem("token");
  window.location.reload();
}

const theme = createTheme();
let doFetch = true;

export default function Dashboard() {
  const [items, setItems] = useState([]);
  let listItems = items.map((element) => {
    return (
      <Fragment key={element.id}>
        <TaskList project={element} />
      </Fragment>
    );
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const tokenString = sessionStorage.getItem("token");

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAdd = (teste) => {
    const concat = [].concat(items, teste);
    setItems(concat);
  };
  if (doFetch) {
    fetch(
      "http://localhost:3000/api/project?" +
        new URLSearchParams({
          id: tokenString,
        }),
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        mode: "cors",
      }
    ).then((res) => {
      res.json().then((result) => {
        setItems(result);
        doFetch = false;
        // setToken(result);
      });
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          flexGrow: 1,
          height: "10vh",
        }}>
        <AppBar
          position="static"
          sx={{
            flexGrow: 1,
            height: "10vh",
          }}>
          <Toolbar>
            <img src={logo} alt="" height={20} />
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1, ml: 2 }}>
              TODO List
            </Typography>
            <div>
              <span>{tokenString}</span>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit">
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                sx={{ mt: -1, ml: -1 }}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "space-between",
          flexWrap: "wrap",
          p: 2,
        }}>
        {listItems}
        <NewProject add={handleAdd} />
      </Box>
    </ThemeProvider>
  );
}
