import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./pages/Login";
import Dashboard from './pages/Dashboard'
import Patients  from "./pages/Patients";
import "./App.css";
import 'boxicons'
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Appointments from "./pages/Appointments";

const router = createBrowserRouter([
  {
    path: '/', 
    element: <Login />,
    errorElement: <NotFound />
  },
  {
    path:'/api/dashboard',
    element: <Dashboard />
  },
  {
    path:'/api/patients/',
    element: <Patients />
  },
  {
    path:'/api/patients/:id',
    element: <Dashboard />
  },
  {
    path:'/api/appointments',
    element:<Appointments/>
  }
]);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);