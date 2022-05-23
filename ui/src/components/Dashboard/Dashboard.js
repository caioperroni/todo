import AccountCircle from "@mui/icons-material/AccountCircle";
import Alert from "@mui/material/Alert";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Fragment, useState } from "react";
import { genOptions } from "../../context/AppContext";
import logo from "../../logo.svg";
import NewProject from "../NewProject";
import TaskList from "../TaskList";

function logout() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("name");
  sessionStorage.removeItem("user");
  window.location.reload();
}

const Theme = require("../Theme");
const theme = createTheme(Theme.config);

let doFetch = true;

export default function Dashboard() {
  const [items, setItems] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const tokenString = sessionStorage.getItem("user");
  const userFullName = sessionStorage.getItem("name");
  const [openSnack, setOpenSnack] = useState(false);
  const [snack, setSnack] = useState("");
  const [severity, setSeverity] = useState("success");

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAdd = (item) => {
    const concat = [].concat(items, item);
    setItems(concat);
    setSnack("Project added!");
    setSeverity("success");
    setOpenSnack(true);
  };

  const handleUpdate = (id, name) => {
    const idx = items.findIndex((item) => {
      return item.id === id;
    });
    const concat = [].concat(items);
    concat[idx].name = name;
    setItems(concat);
    setSnack("Project updated!");
    setSeverity("success");
    setOpenSnack(true);
  };

  const handleRemove = (id) => {
    const idx = items.findIndex((item) => {
      return item.id === id;
    });
    const concat = [].concat(items);
    concat.splice(idx, 1);
    setItems(concat);
    setSnack("Project removed!");
    setSeverity("success");
    setOpenSnack(true);
  };

  let listItems = items.map((element) => {
    return (
      <Fragment key={element.id}>
        <TaskList
          project={element}
          update={handleUpdate}
          remove={handleRemove}
        />
      </Fragment>
    );
  });

  if (doFetch) {
    fetch(
      process.env.REACT_APP_BASE +
        "/api/project?" +
        new URLSearchParams({
          id: tokenString,
        }),
      genOptions()
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
              <span>{userFullName}</span>
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
          justifyContent: "flex-start",
          alignItems: "space-between",
          flexWrap: "wrap",
          p: 2,
        }}>
        <NewProject add={handleAdd} />
        {listItems}
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={openSnack}
        autoHideDuration={5000}
        onClose={handleCloseSnack}>
        <Alert
          variant="filled"
          onClose={handleCloseSnack}
          severity={severity}
          sx={{ width: "100%" }}>
          {snack}
        </Alert>
      </Snackbar>{" "}
    </ThemeProvider>
  );
}
