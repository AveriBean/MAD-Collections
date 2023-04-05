import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
// import { findAll } from "../services/itemService";
import { findById } from "../services/itemService";

export default function Item({ item }) {
  const [reItem, setItem] = useState(item);
  const { itemId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (itemId) {
      findById(itemId)
        .then(setItem)
        .catch(() => navigate("/500"));
    }
  }, [itemId, navigate, item]);

  return (
    <>
      <Col className="d-flex justify-content-center">
        <Card style={{ width: "18rem", marginTop: "10px" }}>
          <Card.Img
            style={{ height: "auto", width: "18rem", marginTop: "10px" }}
            src={reItem.image}
          />
          <Card.Body style={{ textAlign: "center" }}>
            <Card.Title style={{ marginBottom: "10px" }}>
              {reItem.itemName}
            </Card.Title>
            <Card.Text>Description: {reItem.description}</Card.Text>
            <Card.Text>Value: {reItem.value}</Card.Text>
            <Card.Text>
              Item Status:
              {reItem.actions && reItem.actions.map((a) => <h6>{a.status}</h6>)}
            </Card.Text>
            <Card.Text>
              Categories:
              {reItem.categories &&
                reItem.categories.map((c) => <h6>{c.categoryName}</h6>)}
            </Card.Text>
            <Card.Text>
              <Link to={`/view/item/${reItem.itemId}`} className="btn btn-info">
                View
              </Link>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}
