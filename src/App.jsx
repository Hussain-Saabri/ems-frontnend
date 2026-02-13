import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner';
import { CheckmarkCircle02Icon, Alert01Icon } from 'hugeicons-react';
import Login from './features/auth/pages/Login'
import { MainLayout } from './components/layout/MainLayout';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import {
  EmployeesPage,
  AddEmployeePage,
  EditEmployeePage,
  EmployeeProfilePage
} from './features/employees';
import { TooltipProvider } from '@/components/ui/tooltip';

function App() {
  return (
    <TooltipProvider>
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

        {/* Protected Application Routes */}
        <Route element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/employees/:id" element={<EmployeeProfilePage />} />
          <Route path="/employees/edit/:id" element={<EditEmployeePage />} />
          <Route path="/employees/add" element={<AddEmployeePage />} />
        </Route>
      </Routes>
    </TooltipProvider>
  )
}

export default App
