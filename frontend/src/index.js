import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {  RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/linkedin',
    element: <Home />
  }
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>,
  document.getElementById('root')
);

