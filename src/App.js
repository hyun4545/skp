import Main from "./Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./User";
import React, { useState } from "react";
import { MessageBoxProvider } from "./helpers/MessageBox";

function App() {
  return (
    <MessageBoxProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<User />} />
          <Route path="/Main/:userId" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </MessageBoxProvider>
  );
}

export default App;
