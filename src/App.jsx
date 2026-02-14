import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
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
import React, { Suspense, useState } from 'react';
import { useAuth } from './features/auth/hooks/useAuth';
import { AnimatePresence } from 'framer-motion';
import LoginTransition from './features/auth/components/LoginTransition';
import { TooltipProvider } from '@/components/ui/tooltip';

// Conditional import for Audit feature
const LoginActivity = import.meta.env.VITE_ENABLE_AUDIT === 'true'
  ? React.lazy(() => import('./features/audit/pages/LoginActivity'))
  : null;


function App() {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const [showTransition, setShowTransition] = useState(false);

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
          {import.meta.env.VITE_ENABLE_AUDIT === 'true' && (
            <Route
              path="/admin/login-activity"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <LoginActivity />
                </Suspense>
              }
            />
          )}
        </Route>
      </Routes>
      <AnimatePresence>
        {showTransition && <LoginTransition />}
      </AnimatePresence>
    </TooltipProvider>
  )
}

export default App
