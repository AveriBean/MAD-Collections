import {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { findById, deleteById } from "../services/userService";
import AuthContext from "../contexts/AuthContext";

function ConfirmDelete() {

    const[user, setUser] = useState({});
    const [hasError, setHasError] = useState(false);
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const {userId} = useParams();

    useEffect(() => {
        if(userId) {
            findById(userId)
                .then(setUser)
                .catch(() => navigate("/profile"));
        } else {
            navigate("/profile");
        }
    }, [userId,navigate]);

    function handleDelete() {
        deleteById(user.userId)
        .then(() => navigate("/"),
        logout())
        .catch(() => setHasError(true))
    }

    return (
        < main style={{ minHeight: "75vh" }} >
            <div className="container alert alert-danger col-4 my-4">
            <div className="alert alert-danger">
            Do you really want to delete the user {user.username}? (This action will log you out of your account)
            </div>
            <div>
                <button
                    onClick={handleDelete} 
                    style={{
                    background: "black",
                    border: "1px solid lightsteelblue",
                    color: "#D3D3D3",
                    margin: "5%",
                    boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)",
                    }}
                    className="btn btn-primary me-2"
                >
                    Delete
                </button>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                    background: "#FFD700",
                    border: "1px solid lightsteelblue",
                    color: "black",
                    margin: "5%",
                    boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)",
                    }}
                    className="btn ms-0"
                >
                    Cancel
                </button>
        </div>
        </div>
        {hasError && <div className="container alert alert-warning col-4 text-center">There are still items in our collection associated with this account, so it can not be deleted.</div>}
        </main>
    );
}

export default ConfirmDelete;