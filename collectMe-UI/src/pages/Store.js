import { Button, Container, Navbar, Modal, Row, Col } from "react-bootstrap";

function Store() {
    return (
        <div className="container">

            <Navbar expand="sm" style={{background: "none"}}>
                <Navbar.Brand href="/">Collectible Item Store</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end bg-none">
                    <Button>Cart 0 Items</Button>
                </Navbar.Collapse>
            </Navbar>


            <h1>Welcome to Item Checkout!</h1>

            <Row xs={1} md={3} className="g-4">
                <Col align="center">
                    <h1>Product</h1>
                </Col>
                <Col align="center">
                    <h1>Product</h1>
                </Col>
                <Col align="center">
                    <h1>Product</h1>
                </Col>
            </Row>

        </div>
        
    )
}

export default Store;