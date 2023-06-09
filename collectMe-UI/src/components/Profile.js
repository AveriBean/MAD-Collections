import Card from "react-bootstrap/Card";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { findById } from "../services/userService";
import AuthContext from "../contexts/AuthContext";

function Profile() {
  const [currentUser, setCurrentUser] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
  });

  const { user } = useContext(AuthContext);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      findById(userId)
        .then(setCurrentUser)
        .catch(() => navigate("/"));
    }
  }, [userId, navigate]);

  return (
    <div className="d-flex justify-content-center" style={{ minHeight: "75vh" }}>
      <div className="">
        <Card
          style={{
            width: "38rem",
            marginTop: "15vh",
            background: "rgb(150, 186, 156)"
          }}
        >
          <Card.Body style={{ textAlign: "center", margin: "25px" }}>
            {user.userId == currentUser.userId ? (
              <h2 style={{background: "rgb(255, 255, 255)", borderRadius: "25%"}}>{currentUser.username}'s Profile</h2>
            ) : (
              <h2 style={{background: "rgb(255, 255, 255)", borderRadius: "25%"}}>{currentUser.username}'s Contact Information</h2>
            )}
            {user.userId == currentUser.userId ? (
              <>
                <Card.Text>
                  Full Name: {currentUser.firstName} {currentUser.lastName}
                </Card.Text>
              </>
            ) : (
              ""
            )}
            <Card.Text>Email: {currentUser.email}</Card.Text>
            <Card.Text>Phone: {currentUser.phone}</Card.Text>
            {user.userId == currentUser.userId ? (
              <Card.Text>Location: {currentUser.location}</Card.Text>
            ) : (
              ""
            )}
            <Card.Text >
              {user.userId === currentUser.userId ? (
                <>
                <Link
                  to={`/editUser/${currentUser.userId}`}
                  className="btn btn-success any-pop"
                >
                  Update Profile Info
                </Link>
                <Link
                  to={`/deleteUser/${currentUser.userId}`}
                  style={{
                    margin: "5%",
                    boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)",
                  }}
                  className="btn btn-danger"
                >
                  Delete Profile
                </Link>
                </>
              ) : (
                ""
              )}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Profile;
