import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Dashboard from './dashboard.jsx'
import About from './About.jsx'
import Login_Page from './login_signup/Login_Page.jsx'
import Signup_Page from './login_signup/Signup_Page.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Not_Found_Page from './Not_Found_Page.jsx';

const router = createBrowserRouter([
  {path:"/",element:<App/>},
  {path: '/signup', element: <Signup_Page /> },
  {path: '/login', element: <Login_Page /> },
  {path:"/dashboard", element:<Dashboard/>},
  {path:"/about",element:<About/>},
  {path:"*",element:<Not_Found_Page/>}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
