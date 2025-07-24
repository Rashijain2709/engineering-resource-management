import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import ManagerDashboard from './pages/Dashboard/ManagerDashboard';
import EngineerDashboard from './pages/Dashboard/EngineerDashboard';
import Assignments from './pages/Assignments/Assignments';
import Projects from './pages/Projects/Projects';
import Profile from './pages/Profile/Profile';
import { useAuth } from './store/auth';

const App = () => {
  const { token, user } = useAuth();

  return (
    <Router>
      <Routes>
        {!token ? (
          <>
            {/* Public route: Login */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            {/* Redirect root to role-based dashboard */}
            <Route
              path="/"
              element={
                <Navigate
                  to={user?.role === 'manager' ? '/manager' : '/engineer'}
                  replace
                />
              }
            />
            {/* Protected role-based dashboards */}
            <Route path="/manager" element={<ManagerDashboard />} />
            <Route path="/engineer" element={<EngineerDashboard />} />

            {/* Shared protected routes */}
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/profile" element={<Profile />} />

            {/* Redirect unknown routes to root */}
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
