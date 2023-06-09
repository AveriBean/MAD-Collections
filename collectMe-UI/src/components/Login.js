import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authenticate } from "../services/authService";
import AuthContext from "../contexts/AuthContext";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [hasError, setHasError] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleChange(evt) {
    const next = { ...credentials };
    next[evt.target.name] = evt.target.value;
    setCredentials(next);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    authenticate(credentials)
      .then((user) => {
        login(user);
        // console.log(user);
        navigate("/");
      })
      .catch(() => setHasError(true));
  }

  return (
    <div
      className="container d-flex justify-content-center align-items-center col-4"
      style={{ minHeight: "75vh" }}
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="form-label" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <Link to="/" className="btn yellow-pop m-0 me-1 my-2">
            Cancel
          </Link>
          <button type="submit" className="btn dark-pop m-0 me-5">
            Login
          </button>
          <Link to="/createUser" className="btn btn-success any-pop m-0">
            Create New User Account
          </Link>
        </div>
        {hasError && <div className="alert alert-danger">Bad Credentials.</div>}
      </form>
    </div>
  );
}
