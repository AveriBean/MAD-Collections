import { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { add } from "../services/userService";
function UserForm() {

    const [currentUser, setCurrentUser] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        location: ""
    });

    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    function handleChange(evt) {
        const nextUser = { ...currentUser };
        nextUser[evt.target.name] = evt.target.value;

        setCurrentUser(nextUser);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        add(currentUser)
            .then(() => navigate("/login"))
            .catch (errs => {
                if(errs) {
                    setErrors(errs);
                } else {
                    navigate("/login");
                }
            });
    }

    return (
        <div className="container col-6">
            <h2>Create a New User Account</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" name="username" id="username" className="form-control border-dark-subtle" 
                    onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="text" name="password" id="password" className="form-control border-dark-subtle"
                    onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input type="text" name="firstName" id="firstName" className="form-control border-dark-subtle" 
                    onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input type="text" name="lastName" id="lastName" className="form-control border-dark-subtle" 
                    onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" name="email" id="email" className="form-control border-dark-subtle" 
                    onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="text" name="phone" id="phone" className="form-control border-dark-subtle"
                    onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Address</label>
                    <input type="text" name="location" id="location" className="form-control border-dark-subtle"
                    onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <button type="submit" class="btn btn-primary me-1">Save</button>
                    <Link to="/login" className="btn btn-warning">Cancel</Link>
                    </div>
                {errors.length > 0 && <div className="alert alert-danger">
                <ul>
                    {errors.map(err => <li key={err}>{err}</li>)}
                </ul>
            </div>}
            </form>
        </div>

    );

}

export default UserForm;