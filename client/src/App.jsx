import React,{ useState,useContext } from 'react'
import './App.css'
import Login from './pages/Login'
import Home from "./pages/Home"
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
function App() {
  const router=createBrowserRouter([
    {
      path:"/",
      element: <Login />
    }])
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
