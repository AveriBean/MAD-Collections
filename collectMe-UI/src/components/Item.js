import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { findAll } from "../services/itemService";

export default function Item({ item }) {
  // const [items, setItems] = useState([]);
  // const [wait, setWait] = useState(true);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   findAll()
  //     .then((result) => {
  //       setItems(result);
  //       setWait(false);
  //     })
  //     .catch(() => navigate("/500"));
  // }, []);

  // if (wait) {
  //   return (
  //     <div className="spinner-border" role="status">
  //       <span className="visually-hidden">Loading...</span>
  //     </div>
  //   );
  // }

  return (
    <>
      <Col className="d-flex justify-content-center">
        <Card style={{ width: "18rem", marginTop: "10px" }}>
          <Card.Img
            style={{ height: "auto", width: "18rem", marginTop: "10px" }}
            src={`http://localhost:8080${item.image}`}
          />
          <Card.Body style={{ textAlign: "center" }}>
            <Card.Title style={{ marginBottom: "10px" }}>
              {item.itemName}
            </Card.Title>
            <Card.Text>Description: {item.description}</Card.Text>
            <Card.Text>Value: {item.value}</Card.Text>
            <Card.Text>
              Item Status:
              {item.actions.map((a) => (
                <h6>{a.status}</h6>
              ))}
            </Card.Text>
            <Card.Text>
              Categories:
              {item.categories.map((c) => (
                <h6>{c.categoryName}</h6>
              ))}
            </Card.Text>
            <Card.Text>
              <Link to="/view/item" className="btn btn-info">
                View
              </Link>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}
