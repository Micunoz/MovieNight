import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import MovieList, { loadMovies } from "./MovieList";
import MovieDetail, { loadMovieDetail } from "./MovieDetail";
import MovieForm from "./MovieForm";
import UserList, { loadUsers } from "./UserList";
import UserDetail, { loadUserDetail } from "./UserDetail";
import UserForm from "./UserForm";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/movies/add",
        element: <MovieForm />,
      },
      {
        path: "/movies/:movieId",
        element: <MovieDetail />,
        loader: loadMovieDetail,
      },
      {
        path: "/users/add",
        element: <UserForm />,
      },
      {
        path: "/users/:userId",
        element: <UserDetail />,
        loader: loadUserDetail,
      },
      {
        path: "/users",
        element: <UserList />,
        loader: loadUsers,
      },
      {
        path: "/movies",
        element: <MovieList />,
        loader: loadMovies,
      },
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
