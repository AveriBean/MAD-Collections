import { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import "../styles/NavBar.css";

function NavBar() {
  const [click, setClick] = useState(false);
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const handleClick = () => setClick(!click);
  const navigate = useNavigate();

  function handleLogout(evt) {
    evt.preventDefault();
    navigate("/");
    logout();
  }

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo mb-auto">
            M.A.D. Collective
          </NavLink>

          <ul
            className={click ? "nav-menu active" : "nav-menu"}
          >
            <li className="nav-item">
              <NavLink className="nav-links" exact to="/" onClick={handleClick}>
                Home
              </NavLink>
            </li>
            {user ? (
              <li className="nav-item">
                <NavLink
                  className="nav-links"
                  exact
                  to="/add"
                  onClick={handleClick}
                >
                  Add Item
                </NavLink>
              </li>
            ) : (
              ""
            )}
            <li className="nav-item categoryLink">
              <NavLink
                className="nav-links"
                exact
                to="/categories"
                onClick={handleClick}
              >
                Categories
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-links"
                exact
                to="/items"
                onClick={handleClick}
              >
                Items
              </NavLink>
            </li>
            {user ? (
            <li className="nav-item">
              <NavLink
                className="nav-links"
                exact
                to="/store"
                onClick={handleClick}
              >
                Store
              </NavLink>
            </li>
            ) : (
               ""
             )}
            {user ? (
              <li className="nav-item">
                <NavLink
                  className="nav-links"
                  exact
                  to={`/viewProfile/${user.userId}`}
                  onClick={handleClick}
                >
                  Profile
                </NavLink>
              </li>
            ) : (
              ""
            )}
            <li className="nav-item">
              {user ? (
                <>
                  <a
                    href="#logout"
                    className="nav-links"
                    onClick={handleLogout}
                  >
                    Logout
                  </a>
                </>
              ) : (
                <>
                  <NavLink
                    exact
                    to="/login"
                    onClick={handleClick}
                    className={`nav-links${
                      location.pathname.startsWith("/login") ? " active" : ""
                    }`}
                  >
                    Login
                  </NavLink>
                </>
              )}
            </li>
          </ul>

          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
