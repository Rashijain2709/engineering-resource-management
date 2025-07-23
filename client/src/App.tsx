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

  if (!token) {
    return (
      <Router>
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={user?.role === 'manager' ? '/manager' : '/engineer'} />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/engineer" element={<EngineerDashboard />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
