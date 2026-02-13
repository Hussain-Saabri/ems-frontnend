import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { Toaster } from 'sonner';
import { CheckmarkCircle02Icon, Alert01Icon } from 'hugeicons-react';
import Login from './features/auth/pages/Login'
import Signup from './features/auth/pages/Signup'
import { MainLayout } from './components/layout/MainLayout';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import AddEmployee from './features/AddEmployye/page';
import Employees from './features/Employees/page';
import Profile from './features/Employees/Profile';
import EditEmployee from './features/EditEmployee/page';
function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'premium-toast',
          classNames: {
            toast: 'premium-toast group',
            title: 'toast-content-title',
            description: 'toast-content-description',
            success: 'premium-toast-success',
            error: 'premium-toast-error',
          },
        }}
        icons={{
          success: (
            <div className="toast-icon-success">
              <CheckmarkCircle02Icon className="h-5 w-5" />
            </div>
          ),
          error: (
            <div className="toast-icon-error">
              <Alert01Icon className="h-5 w-5" />
            </div>
          ),
        }}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/employees" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Application Routes */}
        <Route element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/:id" element={<Profile />} />
          <Route path="/employees/edit/:id" element={<EditEmployee />} />
          <Route path="/employees/add" element={<AddEmployee />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
