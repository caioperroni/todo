import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  alpha,
  createTheme,
  styled,
  ThemeProvider,
} from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";

const theme = createTheme();
const RedditTextField = styled((props) => (
  <TextField InputProps={{}} {...props} />
))(({ theme }) => ({
  "& .MuiFilledInput-root": {
    backgroundColor: "white",
  },
  "&:hover": {
    backgroundColor: "white",
  },
  "&.Mui-focused": {
    backgroundColor: "white",
    boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
    borderColor: theme.palette.primary.main,
  },
}));
export default function NewProject() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const tokenString = sessionStorage.getItem("token");
    const data = new FormData(event.currentTarget);
    const body = {
      name: data.get("name"),
      user: tokenString,
    };
    fetch("http://localhost:3000/api/project", {
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
        console.log(result);
        // setToken(result);
      });
    });
  };
  return (
    <ThemeProvider theme={theme}>
      <Card
        sx={{
          width: "32.5%",
          backgroundColor: "#ddd",
          p: 2,
          mb: 2,
        }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Create new project
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              mt: 1,
              height: "100%",
            }}>
            <RedditTextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Project name"
              name="name"
              autoComplete="name"
              autoFocus
              variant="filled"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}>
              Create Project
            </Button>{" "}
          </Box>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
