import MoreVertIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import CheckboxList from "../CheckboxList";

const theme = createTheme();

export default function TaskList() {
  return (
    <ThemeProvider theme={theme}>
      <Card
        sx={{
          width: "32.5%",
          backgroundColor: "#eee",
          p: 2,
          mb: 2,
        }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
          sx={{
            backgroundColor: "#ccc",
          }}
        />{" "}
        <CardContent>
          <Typography variant="h5" component="div">
            Create new project
          </Typography>
          <CheckboxList />
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
