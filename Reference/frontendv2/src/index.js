// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// // import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import Layout from "./Layout";
// import TodoList, { loadTodos } from "./TodoList";
// import TodoDetail, { loadTodoDetail } from "./TodoDetail";
// import TodoForm from "./TodoForm";


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       {
//         path: "/todo/new",
//         element: <TodoForm />,
//       },
//       {
//         path: "/todo/:todoId",
//         element: <TodoDetail />,
//         loader: loadTodoDetail,
//       },
//       {
//         path: "/todo",
//         element: <TodoList />,
//         loader: loadTodos,
//       },
//     ]
//   }
// ]);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import ProjectList, { loadProjects } from "./ProjectList";
import ProjectDetail, { loadProjectDetail } from "./ProjectDetail";
import ProjectForm from "./ProjectForm";
import TodoList, { loadTodos } from "./TodoList";
import TodoDetail, { loadTodoDetail } from "./TodoDetail";
import TodoForm from "./TodoForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/project/new",
        element: <ProjectForm />,
      },
      {
        path: "/project/:projectId",
        element: <ProjectDetail />,
        loader: loadProjectDetail,
      },
      {
        path: "/project/:projectId/todo/new",
        element: <TodoForm />,
      },
      {
        path: "/project/:projectId/todo/:todoId",
        element: <TodoDetail />,
        loader: loadTodoDetail,
      },
      {
        path: "/project/:projectId/todo",
        element: <TodoList />,
        loader: loadTodos,
      },
      {
        path: "/project",
        element: <ProjectList />,
        loader: loadProjects,
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

reportWebVitals();