import "./style.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { List, ListItem, ListItemText } from "@mui/material";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import Experience1 from "./experiences/Experience-1.jsx";

// @ts-ignore
const root = ReactDOM.createRoot(document.querySelector("#root"));

const Experiences = () => {
  return (
    <List>
      <ListItem>
        <Link to='experiences/1'>
          <ListItemText primary='Experience 1' />
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
          path='/experiences/1'
          element={<Experience1 />}
        />
        <Route key='home' path='/' element={<Experiences />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
