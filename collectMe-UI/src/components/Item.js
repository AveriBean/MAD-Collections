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
            <Card.Img src={item.image} />
            <Card.Body style={{ textAlign: "center" }}>
              <Card.Title style={{ marginBottom: "10px" }}>
                {item.itemName}
              </Card.Title>
              <Card.Text><b>Description:</b> {item.description}</Card.Text>
              <Card.Text><b>Value:</b> {item.value}</Card.Text>
              <div>
                <b>Item Status:</b>
                {item.actions.map((a) => (
                  <div key={a.actionId}>{a.status}</div>
                ))}
              </div>
              <div>
                <b>Categories:</b>
                {item.categories.map((c) => (
                  <div key={c.categoryId}>{c.categoryName}</div>
                ))}
              </div>
              <Card.Text>
                <Link to="/view/item" className="btn btn-info m-2">
                  View Item
                </Link>
                {user ? (
                    <Link to={`/viewProfile/${item.userId}`} className="btn btn-success">
                    Contact User
                  </Link>
                    ) : ("")}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
    </>
  );
}
