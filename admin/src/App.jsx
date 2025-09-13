import React, { useContext } from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes, Route, Navigate } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify'
import Login from './components/Login/Login'
import { StoreContext } from './context/StoreContext';


const ProtectedRoute = ({ children }) => {
  const { admin } = useContext(StoreContext);
  return admin ? children : <Navigate to="/" replace />;
};

const App = () => {

  const url = import.meta.env.VITE_API_URL;

  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className="app-content">
        <Sidebar></Sidebar>
        <Routes>
          <Route path='/' element={<Login url={url}/>}/>
          <Route path='/add' element={
            <ProtectedRoute>
              <Add url={url}/>
            </ProtectedRoute>
          }/>
          <Route path='/list' element={
            <ProtectedRoute>
              <List url={url}/>
            </ProtectedRoute>
          }/>
          <Route path='/orders' element={
            <ProtectedRoute>
              <Orders url={url}/>
            </ProtectedRoute>
          }/>
        </Routes>
      </div>
    </div>
  )
}

export default App
