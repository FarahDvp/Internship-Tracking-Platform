import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AlumniAccountState from "./components/AlumniAccountState/AlumniAccountState";
import SignupAlumni from "./components/SignUp/SignUp";
import UpdatePassword from "./components/UpdatePassword/UpdatePassword";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
