import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";


function StoreItem({ item }) {

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
                {/* <Card.Text>
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
                </Card.Text>*/}
                <Card.Footer style={{ textAlign: "center", alignItems: "end" }}>
                    <Link to={`/add/${item.itemId}`} className="btn btn-secondary btn-sm">Add to Cart</Link>
                </Card.Footer>
            </Card.Body>
          </Card>
        </Col>
    </>
  );
}

export default StoreItem;


