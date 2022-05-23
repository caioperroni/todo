import { alpha, styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import * as React from "react";

const WhiteTextField = styled((props) => (
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

export default WhiteTextField;
