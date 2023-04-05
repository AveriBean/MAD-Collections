import { Button, Card, Col } from "react-bootstrap";
import { CartContext } from "../contexts/CartContext";
import { useContext } from "react";


function StoreItem({ item }) {
    const cart = useContext(CartContext);
    const itemQuantity = cart.getItemQuantity(item.itemId);
    console.log(cart.items);

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
                <Card.Footer style={{ textAlign: "center", alignItems: "end" }}>
                    <Button variant="secondary" onClick={() => cart.addOneToCart(item.itemId)}>Add to Cart</Button>
                </Card.Footer>
            </Card.Body>
          </Card>
        </Col>
    </>
  );
}

export default StoreItem;