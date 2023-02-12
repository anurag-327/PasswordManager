import React,{ useState,useContext } from 'react'
import './App.css'
import Login from './pages/Login'
import Home from "./pages/Home"
import TestPassword from "./components/TestPassword.jsx"

import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import PasswordGenerator from './components/PasswordGenerator'
function App() {
  const router=createBrowserRouter([
    {
      path:"/",
      element: <Login />
    },
    {
      path:"/home",
      element:<Home />
    },
    {
      path:"/testpassword",
      element:<TestPassword />
    },
    {
      path:"/generatepassword",
      element:<PasswordGenerator />
    }
  ])
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
