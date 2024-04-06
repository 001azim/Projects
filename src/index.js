import React from 'react';
import './index.css';
import App from './App';
import {store} from './store'
import { Provider } from 'react-redux';
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Index from './game';
import Game from './game/game';
import History from './game/history';
const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
 
  },
  {   path:"/game",
  element:<Game/>},
  {   path:"/history",
  element:<History/>}
]);
root.render(
  <Provider store={store}>
  <React.StrictMode>
  <RouterProvider router={router} />
    <App />
  </React.StrictMode>
  </Provider>
);

