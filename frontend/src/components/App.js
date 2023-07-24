import { Route, Routes } from "react-router-dom";
import React from "react";

import "../style/App.scss";
import Index from "./pages/index";
import Layout from "../Layout";
import Login from "./auth/login";
import Register from "./auth/register";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Index />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
