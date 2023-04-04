import { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import "../styles/NavBar.css";

function NavBar() {
  const [click, setClick] = useState(false);
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const handleClick = () => setClick(!click);

  function handleLogout(evt) {
    evt.preventDefault();
    logout();
  }

  return (
    <>

    <nav className="navbar">
      <div className="nav-container">
        <NavLink exact to="/" className="nav-logo">
          M.A.D. Collective
        </NavLink>

        <ul className={click ? "nav-menu active" : "nav-menu"}>
             <li className="nav-item">
              <NavLink className="nav-links" exact to="/" activeClassName="active" onClick={handleClick}>
                Home
              </NavLink>
            </li>
            {user ? (
               <li className="nav-item">
                <NavLink className="nav-links" exact to="/add" activeClassName="active" onClick={handleClick}>
                  Add Item
                </NavLink>
              </li>
            ) : (
              ""
            )}
             <li className="nav-item">
              <NavLink className="nav-links" exact to="/categories" activeClassName="active" onClick={handleClick}>
                Categories
              </NavLink>
            </li>
             <li className="nav-item">
              <NavLink className="nav-links" exact to="/items" activeClassName="active" onClick={handleClick}>
                Items
              </NavLink>
            </li>
            {user ? (
               <li className="nav-item">
                <NavLink className="nav-links" exact to="/profile" activeClassName="active" onClick={handleClick}>
                  Profile
                </NavLink>
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
                  <h6>Hello ${user.sub}</h6>
                </>
              ): (
                <>
                <NavLink
                  exact to="/login" activeClassName="active" onClick={handleClick}
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
