import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import DashboardLayout from './layout/DashboardLayout'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Orders from './pages/Orders'
import OrderDetails from './pages/OrderDetails'
import Workers from './pages/Workers'
import WorkerDetails from './pages/WorkerDetails'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/dashboard'></Navigate>} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<DashboardLayout><Dashboard /></DashboardLayout>} />
      <Route path='/products' element={<DashboardLayout><Products /></DashboardLayout>} />
      <Route path='/products/:id' element={<DashboardLayout><ProductDetails></ProductDetails></DashboardLayout>} />
      <Route path='/products/new' element={<DashboardLayout><ProductDetails></ProductDetails></DashboardLayout>} />
      <Route path='/orders' element={<DashboardLayout><Orders /></DashboardLayout>} />
      <Route path='/orders/:id' element={<DashboardLayout><OrderDetails /></DashboardLayout>} />
      <Route path='/workers' element={<DashboardLayout><Workers /></DashboardLayout>} />
      <Route path='/workers/:id' element={<DashboardLayout><WorkerDetails></WorkerDetails></DashboardLayout>} />
      <Route path='/workers/new' element={<DashboardLayout><WorkerDetails></WorkerDetails></DashboardLayout>} />

    </Routes >
  )
}

export default App