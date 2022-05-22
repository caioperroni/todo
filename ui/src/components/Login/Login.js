import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import background from "../../todo.jpg";
import logo from "../../logo.svg";

function setToken(userToken) {
  sessionStorage.setItem("token", userToken);
  window.history.pushState({}, "", "/");
  window.location.reload();
}

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

export default function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      user: data.get("user"),
      pass: data.get("password"),
    };
    fetch(process.env.REACT_APP_BASE + "/api/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(body),
    }).then((res) => {
      res.json().then((result) => {
        setToken(result);
      });
    });
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
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{
                mt: 1,
                height: "100%",
              }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="user"
                label="Username"
                name="user"
                autoComplete="user"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2 }}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link href="/join" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
            <Copyright sx={{ mt: 12 }} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
