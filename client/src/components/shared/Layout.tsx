import { ReactNode } from 'react';
import LogoutButton from './LogoutButton';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../store/auth';

const Layout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col justify-between p-4">
        <div className="space-y-2">
          {/* Shared: Profile */}
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `block px-4 py-2 rounded transition-colors text-left font-medium ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-200 hover:bg-blue-500 hover:text-white'
              }`
            }
          >
            Profile
          </NavLink>

          {user?.role === 'manager' && (
            <>
              <NavLink
                to="/projects"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded transition-colors text-left font-medium ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-200 hover:bg-blue-500 hover:text-white'
                  }`
                }
              >
                Projects
              </NavLink>

              <NavLink
                to="/assignments"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded transition-colors text-left font-medium ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-200 hover:bg-blue-500 hover:text-white'
                  }`
                }
              >
                Assignments
              </NavLink>

              <NavLink
                to="/manager"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded transition-colors text-left font-medium ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-200 hover:bg-blue-500 hover:text-white'
                  }`
                }
              >
                Manager
              </NavLink>
            </>
          )}

          {user?.role === 'engineer' && (
            <NavLink
              to="/engineer"
              className={({ isActive }) =>
                `block px-4 py-2 rounded transition-colors text-left font-medium ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-200 hover:bg-blue-500 hover:text-white'
                }`
              }
            >
              Engineer
            </NavLink>
          )}
        </div>

        <LogoutButton />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto bg-gray-50">{children}</main>
    </div>
  );
};

export default Layout;
