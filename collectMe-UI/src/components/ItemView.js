import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { findById } from "../services/itemService";
import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";
import { Row } from "react-bootstrap";

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
        <Card
          style={{
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 0 3px 2px #cec7c759",
            alignItems: "center",
            width: "22rem",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <Card.Img
            style={{ width: "20rem", marginTop: "10px", height: "auto" }}
            src={item.image}
          />
          <Card.Body
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <Card.Title style={{ marginBottom: "10px" }}>
              {item.itemName}
            </Card.Title>
            <Card.Text>Description: {item.description}</Card.Text>
            <Card.Text>
              <b>Value:</b> ${item.value && item.value.toFixed(2)}
            </Card.Text>
            <Card.Text>
              <b>Item Status:</b>
              {item.actions && item.actions.map((a) => <h6>{a.status}</h6>)}
            </Card.Text>
            <Card.Text>
              <b>Categories:</b>
              {item.categories &&
                item.categories.map((c) => <h6>{c.categoryName}</h6>)}
            </Card.Text>
            <Card.Text>
              {user && user.userId === item.userId ? (
                <Col className="d-flex justify-content-center">
                  <Link
                    className="btn dark-pop me-2"
                    to={`/add/${item.itemId}`}
                  >
                    Edit
                  </Link>
                  <Link
                    className="btn yellow-pop ms-0"
                    to={`/delete/${item.itemId}`}
                  >
                    Delete
                  </Link>
                </Col>
              ) : (
                ""
              )}
            </Card.Text>
            <Card.Text className="mt-auto">
              {user && user.userId !== item.userId ? (
                <Link
                  to={`/viewProfile/${item.userId}`}
                  className="btn dark-pop"
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
