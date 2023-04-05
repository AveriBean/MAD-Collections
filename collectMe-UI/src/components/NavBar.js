import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

function NavBar() {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  function handleLogout(evt) {
    evt.preventDefault();
    logout();
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{height: "5vh"}}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <h1 className="text-white">M.A.D. Collectibles</h1>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsible"
          aria-controls="collapsible"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsible">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {user ? (
              <li className="nav-item">
                <Link className="nav-link" to="/add">
                  Add Item
                </Link>
              </li>
            ) : (
              ""
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/categories">
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/items">
                Items
              </Link>
            </li>
            {user ? (
              <li className="nav-item">
                <Link className="nav-link" to={`/viewProfile/${user.userId}`}>
                  Profile
                </Link>
              </li>
            ) : (
              ""
            )}
            <li className="nav-item">
              {user ? (
                <>
                  <a href="#logout" className="nav-link" onClick={handleLogout}>
                    Logout
                  </a>
                </>
              ): (
                <>
                <Link
                  to="/login"
                  className={`nav-link${
                    location.pathname.startsWith("/login") ? " active" : ""
                  }`}
                >
                  Login
                </Link>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
