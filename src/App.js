import Main from "./Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./User";
import React from "react";
import {
  Backdrop,
  CircularProgress,
} from "@mui/material";

function App() {
  const [open, setOpen] = React.useState(false);
  const spinnerClose = () => {
    setOpen(false);
  };
  const spinnerOpen = () => {
    setOpen(true);
  };

  const gp={
    spinnerOpen:spinnerOpen,spinnerClose:spinnerClose
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<User {...gp} />} />
          <Route path="/Main/:user" element={<Main {...gp}/>} />
        </Routes>
      </BrowserRouter>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={spinnerClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default App;
