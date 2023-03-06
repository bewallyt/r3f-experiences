import "./style.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { List, ListItem, ListItemText } from "@mui/material";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import Experience1 from "./experiences/Experience-1.jsx";
import Experience2 from "./experiences/Experience-2.jsx";

// @ts-ignore
const root = ReactDOM.createRoot(document.querySelector("#root"));

const Experiences = () => {
  return (
    <List>
      <ListItem>
        <Link to='/1'>
          <ListItemText primary='Experience 1' />
        </Link>
      </ListItem>
      <ListItem>
        <Link to='/2'>
          <ListItemText primary='Experience 2' />
        </Link>
      </ListItem>
    </List>
  );
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          key='route-to-experience-1'
          path='/1'
          element={<Experience1 />}
        />
        <Route
          key='route-to-experience-2'
          path='/2'
          element={<Experience2 />}
        />
        Ï
        <Route key='home' path='/' element={<Experiences />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
