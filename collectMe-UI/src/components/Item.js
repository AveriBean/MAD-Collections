import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

export default function Item({ item }) {
  return (
    <>
      <Col key={item.itemId} className="d-flex justify-content-center">
        <Card
          style={{
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 0 3px 2px #cec7c759",
            alignItems: "center",
            width: "18rem",
            marginTop: "10px",
          }}
        >
          <Card.Img
            style={{ width: "16rem", marginTop: "10px", height: "auto" }}
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
            <Card.Text>
              <b>Description:</b> {item.description}
            </Card.Text>
            <Card.Text>
              <b>Value:</b> {item.value}
            </Card.Text>
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
            <Card.Text className="mt-auto">
              <Link to={`/view/item/${item.itemId}`} className="btn dark-pop">
                View Item
              </Link>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}
