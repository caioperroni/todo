import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import logo from "../../logo.svg";
import background from "../../todo.jpg";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}>
      {"By "}
      <Link color="inherit" href="https://caios.page/">
        Caio Perroni
      </Link>
      {" - "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Theme = require("../Theme");
const theme = createTheme(Theme.config);

export default function Join() {
  const [open, setOpen] = useState(false);
  const [snack, setSnack] = useState("User added! please sign in...");
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      name: data.get("name"),
      user: data.get("user"),
      pass: data.get("pass"),
    };
    fetch(process.env.REACT_APP_BASE + "/api/user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(body),
    })
      .then((res) => {
        console.log(res);
        if (res.status === 500) {
          res.text().then((x) => {
            setSnack(x);
            console.log(snack);
            setOpen(true);
          });
        } else {
          res
            .json()
            .then((result) => {
              console.log(result);
              setOpen(true);
              // window.history.pushState({}, "", "/");
              // window.location.reload();
            })
            .catch((x) => {
              console.log(x);
            });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "fit",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              mt: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <img src={logo} alt="" height={20} />
            <h1>TODO List</h1>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <PersonAddAltIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Full Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="user"
                    label="Username"
                    name="user"
                    autoComplete="user"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="pass"
                    label="Password"
                    type="password"
                    id="pass"
                    autoComplete="new-pass"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
            <Copyright sx={{ mt: 4 }} />
          </Box>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {snack}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
