import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function Navbar() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const closeNavbar = () => {
    const navbar = document.querySelector('.navbar-collapse');
    if (navbar?.classList.contains('show')) {
      navbar.classList.remove('show');
    }
  };

  const handleLogout = () => {
    closeNavbar();
    logout();
    navigate('/');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-black shadow-sm sticky-top py-3">
        <div className="container">
          <Link
            to="/"
            className="navbar-brand fw-bold fs-4 text-warning d-flex align-items-center gap-2"
            onClick={() => {
              closeNavbar();
              navigate('/');
            }}
          >
            🎬 <span style={{ letterSpacing: '1px' }}>CineScope</span>
          </Link>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navMenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navMenu">
            <ul className="navbar-nav ms-auto gap-2 align-items-center">
              {user ? (
                <>
                  <li className="nav-item">
                    <Link
                      to="/saved"
                      className="btn btn-sm btn-outline-warning px-3 py-1 shadow-sm"
                      onClick={closeNavbar}
                    >
                      ❤️ Saved
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-sm btn-outline-light px-3 py-1 shadow-sm"
                      onClick={handleLogout}
                    >
                      🚪 Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      to="/login"
                      className="btn btn-sm btn-outline-light px-3 py-1 shadow-sm"
                      onClick={closeNavbar}
                    >
                      🔑 Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/signup"
                      className="btn btn-sm btn-outline-info px-3 py-1 shadow-sm"
                      onClick={closeNavbar}
                    >
                      📝 Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* 👇 Inline Component-Specific Styles */}
      <style>{`
        .navbar-brand:hover {
          opacity: 0.9;
          transform: scale(1.01);
          transition: all 0.2s ease-in-out;
        }

        .navbar .btn {
          transition: all 0.3s ease-in-out;
        }

        .navbar .btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </>
  );
}
