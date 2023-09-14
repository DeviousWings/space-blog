import { Route, Routes } from "react-router-dom";
import React from "react";

import "../style/App.scss";
import Index from "./pages/index";
import Layout from "../Layout";
import Login from "./auth/login";
import Register from "./auth/register";
import { UserContextProvider } from "./navigation/UserContext";
import CreatePost from "./pages/Create";
import Page from "./pages/Page";
import Edit from "./pages/edit";
import About from "./pages/about-me";
import Contact from "./pages/contact";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="/about-me" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/post/:id" element={<Page />} />
          <Route path="edit/:id" element={<Edit />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
