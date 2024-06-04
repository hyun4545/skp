import Main from "./Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./User";
import React, { useState } from "react";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<User />} />
          <Route path="/Main/:user" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
