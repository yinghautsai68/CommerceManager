import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import DashboardLayout from './layout/DashboardLayout'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<DashboardLayout><Dashboard /></DashboardLayout>} />
      <Route path='/products' element={<DashboardLayout><Products /></DashboardLayout>} />
      <Route path='/products/:id' element={<DashboardLayout><ProductDetails></ProductDetails></DashboardLayout>} />
    </Routes >
  )
}

export default App