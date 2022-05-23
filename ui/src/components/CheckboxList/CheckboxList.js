import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import TaskIcon from "@mui/icons-material/Task";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Fragment, useState } from "react";
import "./CheckboxList.css";

export default function CheckboxList(props) {
  const [checked, setChecked] = useState([0]);

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
      process.env.REACT_APP_BASE +
        "/api/task/update?" +
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
        if (result === "ok") {
          task.finishedOn = new Date().toUTCString();
          props.done(task);
        }
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
      process.env.REACT_APP_BASE +
        "/api/task/update?" +
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
      process.env.REACT_APP_BASE +
        "/api/task/remove?" +
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
                    <TaskIcon />
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
                m: 0,
                p: 0,
              }}
              dense>
              <ListItemAvatar
                sx={{
                  m: 0,
                  p: 0,
                  minWidth: "30px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                {value.finishedOn ? (
                  <TaskIcon sx={{ color: "#4caf50" }} />
                ) : (
                  <PendingActionsIcon sx={{ color: "#ff9800" }} />
                )}
              </ListItemAvatar>
              <ListItemIcon
                sx={{
                  m: 0,
                  p: 0,
                  minWidth: "30px",
                }}>
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
                      width: "60%",
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
                    <TaskIcon />
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
                <Fragment key={value.id}>
                  <Tooltip
                    title={
                      value.finishedOn
                        ? `Finished on ${value.finishedOn}`
                        : `Created on ${value.createdOn}`
                    }
                    placement="left">
                    <ListItemText id={labelId}>
                      <Typography variant="body1" component="div">
                        {value.description}
                      </Typography>
                    </ListItemText>
                  </Tooltip>
                </Fragment>
              )}
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
