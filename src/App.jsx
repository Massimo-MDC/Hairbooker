import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import AppointmentListPage from './pages/AppointmentListPage';
import Navbar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />


        <Route 
          path="/appointments" 
          element={
          <ProtectedRoute allowedRoles={['user']}>
            <AppointmentListPage />
          </ProtectedRoute>
          } 
        />

      </Routes>
    </Router>
  );
}

export default App;
