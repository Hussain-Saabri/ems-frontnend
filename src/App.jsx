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
          className: 'glass-toast !bg-white/90 backdrop-blur-md border border-gray-200/50 shadow-[0_8px_32px_rgba(0,0,0,0.12)]',
          classNames: {
            toast: 'group toast p-4 rounded-2xl flex items-center gap-3.5',
            title: 'text-[14px] font-semibold tracking-tight text-gray-900',
            description: 'text-[12px] text-gray-500 font-medium',
            success: 'success-toast',
            error: 'error-toast',
          },
        }}
        icons={{
          success: (
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50">
              <CheckmarkCircle02Icon className="h-4 w-4 text-emerald-500" />
            </div>
          ),
          error: (
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-50">
              <Alert01Icon className="h-4 w-4 text-rose-500" />
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
