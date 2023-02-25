import { createBrowserRouter } from 'react-router-dom';

import Default from './layouts/Default';

import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Default />,
    children: [
      {
        path: '/',
        element: <Home />
      },

      {
        path: '/login',
        element: <Login />
      },

      {
        path: '/register',
        element: <Register />
      }
    ]
  }
]);
