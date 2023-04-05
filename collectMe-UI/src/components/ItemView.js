import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { findById } from "../services/itemService";
import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";

export default function ItemView() {
  const [item, setItem] = useState({});
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (itemId) {
      findById(itemId)
        .then(setItem)
        .catch(() => navigate("/500"));
    } else {
      navigate("/");
    }
  }, [itemId, navigate]);

  return (
    <>
      <Col className="d-flex justify-content-center">
        <Card style={{ width: "18rem", marginTop: "10px" }}>
          <Card.Img
            style={{ height: "auto", width: "18rem", marginTop: "10px" }}
            src={item.image}
          />
          <Card.Body style={{ textAlign: "center" }}>
            <Card.Title style={{ marginBottom: "10px" }}>
              {item.itemName}
            </Card.Title>
            <Card.Text>Description: {item.description}</Card.Text>
            <Card.Text>Value: {item.value}</Card.Text>
            <Card.Text>
              Item Status:
              {item.actions && item.actions.map((a) => <h6>{a.status}</h6>)}
            </Card.Text>
            <Card.Text>
              Categories:
              {item.categories &&
                item.categories.map((c) => <h6>{c.categoryName}</h6>)}
            </Card.Text>
            <Card.Text>
              {user.userId && user.userId === item.userId && (
                <>
                  <Link
                    style={{
                      background: "black",
                      border: "1px solid lightsteelblue",
                      color: "#D3D3D3",
                      margin: "5%",
                      boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)",
                    }}
                    className="btn btn-primary me-2"
                    to={`/add/${item.itemId}`}
                  >
                    Edit
                  </Link>
                  <Link
                    style={{
                      background: "#FFD700",
                      border: "1px solid lightsteelblue",
                      color: "black",
                      margin: "5%",
                      boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)",
                    }}
                    className="btn ms-0"
                    to={`/delete/${item.itemId}`}
                  >
                    Delete
                  </Link>
                </>
              )}
            </Card.Text>
            <Card.Text>
              {user ? (
                <Link
                  to={`/viewProfile/${item.userId}`}
                  className="btn btn-primary"
                  style={{
                    background: "black",
                    border: "1px solid lightsteelblue",
                    color: "#D3D3D3",
                    margin: "5%",
                    boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)",
                  }}
                >
                  Contact Owner
                </Link>
              ) : (
                ""
              )}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}
