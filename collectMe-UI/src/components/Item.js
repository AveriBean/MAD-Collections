import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";


export default function Item({ item }) {

  return (
    <>
        <Col className="d-flex justify-content-center">
          <Card style={{ width: "18rem", marginTop: "10px" }}>
            <Card.Img src={item.image} />
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
