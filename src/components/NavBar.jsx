import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-around">
      <Link to="/">Home</Link>

      {/* Questo è il problema che hai trovato: deve essere !isAuthenticated */}
      {!isAuthenticated && <Link to="/login">Login</Link>}

      {isAuthenticated && user?.role === 'admin' && (
        <>
          <Link to="/admin/dashboard">Admin Dashboard</Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </>
      )}

      {isAuthenticated && user?.role === 'user' && (
        <>
          <Link to="/appointments">Appointments</Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
