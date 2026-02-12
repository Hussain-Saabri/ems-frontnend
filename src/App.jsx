import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Toaster } from 'sonner';
import Login from './features/auth/pages/Login'
import Signup from './features/auth/pages/Signup'
import { MainLayout } from './components/layout/MainLayout';
import { Dashboard, AddEmployee, Settings } from './features/common/pages/Placeholders';
import Employees from './features/Employees/page';
function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Main Application Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/add" element={<AddEmployee />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
