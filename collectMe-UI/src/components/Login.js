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
    <div className="container col-4">
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
          <Link
            style={{
              background: "#FFD700",
              border: "1px solid lightsteelblue",
              color: "black",
              margin: "5%",
              boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)",
            }}
            to="/"
            className="btn btn-warning ms-0"
          >
            Cancel
          </Link>
          <button
            style={{
              background: "black",
              border: "1px solid lightsteelblue",
              color: "#D3D3D3",
              margin: "5%",
              boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)",
            }}
            type="submit"
            className="btn btn-primary ms-0"
          >
            Login
          </button>
        </div>
        {hasError && <div className="alert alert-danger">Bad Credentials.</div>}
      </form>
    </div>
  );
}
