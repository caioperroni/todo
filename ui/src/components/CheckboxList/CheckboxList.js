import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import * as React from "react";
import "./CheckboxList.css";
import CancelIcon from "@mui/icons-material/Cancel";
export default function CheckboxList(props) {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    if (!props.disable) {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setChecked(newChecked);
    }
  };
  const handleDone = (task) => {
    fetch(
      "http://localhost:3000/api/task/update?" +
        new URLSearchParams({
          id: task.id,
          name: task.description,
          finishedOn: "ok",
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
        if (result === "ok") props.done(task);
      });
    });
  };
  const handleFocus = (ev, task) => {
    ev.target.value = task.description;
  };
  const handleUpdateClick = (task) => {
    task.edit = !task.edit;
    setChecked([0]);
  };
  const handleUpdate = (event, task) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    fetch(
      "http://localhost:3000/api/task/update?" +
        new URLSearchParams({
          id: task.id,
          name: data.get("name"),
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
        if (result === "ok") {
          task.description = data.get("name");
          props.update(task);
          task.edit = false;
        }
      });
    });
  };
  const handleRemove = (task) => {
    fetch(
      "http://localhost:3000/api/task/remove?" +
        new URLSearchParams({
          id: task.id,
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
        if (result === "ok") props.remove(task);
      });
    });
  };
  return (
    <List sx={{ width: "100%", bgcolor: "#eee" }}>
      {props.tasks.map((value) => {
        const labelId = `checkbox-list-label-${value.id}`;

        return (
          <ListItem
            key={value.id}
            secondaryAction={
              checked.indexOf(value.id) !== -1 && !value.edit ? (
                <Box>
                  <IconButton
                    onClick={() => handleDone(value)}
                    size="small"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit">
                    <CheckCircleIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleUpdateClick(value)}
                    size="small"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit">
                    <EditIcon />
                  </IconButton>{" "}
                  <IconButton
                    onClick={() => handleRemove(value)}
                    size="small"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit">
                    <DeleteForeverIcon />
                  </IconButton>
                </Box>
              ) : (
                ""
              )
            }
            disablePadding>
            <ListItemButton
              role={undefined}
              onClick={handleToggle(value.id)}
              className={props.disable ? "disabled" : ""}
              sx={{
                maxHeight: "5vh",
              }}
              dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                  disabled={props.disable}
                />
              </ListItemIcon>
              {value.edit ? (
                <Box
                  component="form"
                  noValidate
                  onSubmit={(ev) => {
                    handleUpdate(ev, value);
                  }}
                  sx={{
                    mx: 1,
                    mr: -1,
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                  <TextField
                    sx={{
                      width: "70%",
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
                    focused={value.edit}
                    onFocus={(ev) => {
                      handleFocus(ev, value);
                    }}
                  />
                  <IconButton
                    size="small"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    type="submit"
                    color="inherit">
                    <CheckCircleIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleUpdateClick(value)}
                    size="small"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit">
                    <CancelIcon />
                  </IconButton>
                </Box>
              ) : (
                <ListItemText id={labelId} primary={value.description} />
              )}
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
