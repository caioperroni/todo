import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import CheckboxList from "../CheckboxList";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const theme = createTheme();
let doFetch = true;

export default function TaskList(props) {
  const [items, setItems] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);
  const id = props.project.id;
  const handleDone = (task) => {
    const pending = items.filter((pendingTask) => {
      return pendingTask.id !== task.id;
    });
    const completed = [].concat(task, completedItems);
    setItems(pending);
    setCompletedItems(completed);
    doFetch = false;
  };
  const handleUpdate = (task) => {
    const pending = [].concat(items);
    const idx = pending.findIndex((pendingTask) => {
      return pendingTask.id === task.id;
    });
    pending[idx].description = task.description;
    setItems(pending);
  };
  const handleRemove = (task) => {
    const pending = items.filter((pendingTask) => {
      return pendingTask.id !== task.id;
    });
    setItems(pending);
    doFetch = false;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const targ = event.currentTarget;
    const body = {
      description: data.get("name"),
      project: id,
    };
    data.delete("name");
    fetch("http://localhost:3000/api/task", {
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
        targ.reset();
        console.log(targ);
        const concat = [].concat(result, items);
        setItems(concat);
      });
    });
  };

  if (id) {
    if (doFetch) {
      fetch(
        "http://localhost:3000/api/task?" +
          new URLSearchParams({
            id,
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
          const pending = result.filter((task) => {
            return !task.finishedOn;
          });
          const completed = result.filter((task) => {
            return !!task.finishedOn;
          });
          setItems(pending);
          setCompletedItems(completed);
          doFetch = false;
          // setToken(result);
        });
      });
    }
    return (
      <ThemeProvider theme={theme}>
        <Card
          sx={{
            width: "32.5%",
            backgroundColor: "#eee",
            mb: 2,
          }}>
          <CardHeader
            title={"Project: " + props.project.name}
            sx={{
              bgcolor: "primary.light",
            }}
            action={
              <Box>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit">
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit">
                  <DeleteForeverIcon />
                </IconButton>
              </Box>
            }
          />
          <CardContent
            sx={{
              p: 2,
              maxHeight: "50vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "space-between",
            }}>
            <Box
              sx={{
                overflowY: "auto",
                minHeight: "30vh",
              }}>
              <Typography variant="body2" component="div">
                <b>To Do:</b>
              </Typography>
              {items.length === 0 ? (
                <Typography variant="body2" component="div">
                  <small>No tasks</small>
                </Typography>
              ) : (
                ""
              )}{" "}
              <CheckboxList
                tasks={items}
                done={handleDone}
                update={handleUpdate}
                remove={handleRemove}
              />
              <hr></hr>
              <Typography variant="body2" component="div">
                <b>Done:</b>
              </Typography>
              {completedItems.length === 0 ? (
                <Typography variant="body2" component="div">
                  <small>No tasks</small>
                </Typography>
              ) : (
                ""
              )}{" "}
              <CheckboxList tasks={completedItems} disable={true} />
            </Box>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{
                mb: -2,
                mx: 1,
                height: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
              <TextField
                sx={{
                  width: "80%",
                  mt: "10px",
                }}
                margin="normal"
                required
                size="small"
                id="name"
                label="Task"
                name="name"
                autoComplete="name"
                autoFocus
              />
              <Button type="submit" variant="contained" sx={{ mt: 2, mb: 2 }}>
                Add{" "}
              </Button>{" "}
            </Box>{" "}
          </CardContent>
        </Card>
      </ThemeProvider>
    );
  } else {
    return <div className="App">Loading...</div>;
  }
}
