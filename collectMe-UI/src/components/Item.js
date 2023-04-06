import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

export default function Item({ item }) {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Col key={item.itemId} className="d-flex justify-content-center">
        <Card style={{ width: "18rem", marginTop: "10px" }}>
          <Card.Img
            style={{ width: "18rem", marginTop: "10px", height: "auto" }}
            src={item.image}
          />
          <Card.Body style={{ textAlign: "center" }}>
            <Card.Title style={{ marginBottom: "10px" }}>
              {item.itemName}
            </Card.Title>
            <Card.Text>
              <b>Description:</b> {item.description}
            </Card.Text>
            <Card.Text>
              <b>Value:</b> ${item.value.toFixed(2)}
            </Card.Text>
            <Card.Text>
              <b>Item Status:</b>
              {item.actions.map((a) => (
                <div key={a.actionId}>{a.status}</div>
              ))}
            </Card.Text>
            <Card.Text>
              <b>Categories:</b>
              {item.categories.map((c) => (
                <div key={c.categoryId}>{c.categoryName}</div>
              ))}
            </Card.Text>
            <Card.Footer style={{ textAlign: "center", alignItems: "end" }}>
              <Link
                to={`/view/item/${item.itemId}`}
                className="btn btn-primary"
                style={{
                  background: "black",
                  border: "1px solid lightsteelblue",
                  color: "#D3D3D3",
                  margin: "5%",
                  boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)",
                }}
              >
                View Item
              </Link>
            </Card.Footer>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}
