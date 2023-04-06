import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { CartContext } from "../contexts/CartContext";
import { useContext } from "react";

function StoreItem({ item }) {
  const cart = useContext(CartContext);
  const itemQuantity = cart.getItemQuantity(item.itemId);
  console.log(cart.items);

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
              <b>Value:</b> ${item.value.toFixed(2)}
            </Card.Text>
            <Card.Text
              className="mt-auto"
              style={{
                textAlign: "center",
                alignItems: "end",
                padding: "0px",
                border: "0px",
              }}
            >
              {itemQuantity > 0 ? (
                <>
                  <Form as={Row}>
                    <Form.Label as={Col} sm="6">
                      In Cart: {itemQuantity}
                    </Form.Label>
                    <Col sm="6">
                      <Button
                        sm="6"
                        variant="success"
                        onClick={() => cart.addOneToCart(item.itemId)}
                        className="mx-2"
                      >
                        +
                      </Button>
                      <Button
                        sm="6"
                        variant="warning"
                        onClick={() => cart.removeOneFromCart(item.itemId)}
                        className="mx-2"
                      >
                        -
                      </Button>
                    </Col>
                  </Form>
                  <Button
                    variant="danger"
                    onClick={() => cart.deleteFromCart(item.itemId)}
                    className="my-2"
                  >
                    Remove from Cart
                  </Button>
                </>
              ) : (
                <Button
                  variant="secondary"
                  onClick={() => cart.addOneToCart(item.itemId)}
                >
                  Add to Cart
                </Button>
              )}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}

export default StoreItem;
