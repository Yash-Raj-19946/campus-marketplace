import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    navigate(`/buy?search=${encodeURIComponent(search)}`);
    setSearch("");
  };

  const handleLogout = () => {
    logout();           // clears token + context
    navigate("/");      // instant redirect
  };

  return (
    <header className="navbar">
      {/* LEFT */}
      <div className="navbar-box navbar-left">
        <Link to="/" className="navbar-title">
          College Buy & Rent Marketplace
        </Link>
      </div>

      {/* CENTER */}
      <div className="navbar-box navbar-search">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>

      {/* RIGHT */}
      <div className="navbar-box navbar-right">
        {user ? (
          <>
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>

            {user.role === "admin" && (
              <Link to="/admin" className="nav-link admin">
                Admin
              </Link>
            )}

            <button className="nav-btn logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-btn login">
              Login
            </Link>
            <Link to="/register" className="nav-btn register">
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
