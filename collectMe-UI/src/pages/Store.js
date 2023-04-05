import { Button, Container, Navbar, Modal, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { findAll } from "../services/itemService"
import StoreItem from "../components/StoreItem";

function Store() {

    const [items, setItems] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        findAll()
            .then(setItems)
            .catch(alert);
    }, []);


    return (
        <div className="container">

            <Navbar expand="sm" style={{background: "none", position: "static"}}>
                <Navbar.Brand href="/">Collectible Item Store</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end bg-none">
                    <Button onClick={handleShow}>Cart 0 Items</Button>
                </Navbar.Collapse>
            </Navbar>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1>Test the Modal</h1>
                </Modal.Body>
            </Modal>


            <h1 align="center" className="p-3">Welcome to Item Checkout!</h1>

            <Row xs={1} md={3} className="g-4">

                {items.map(i => <StoreItem key={i.itemId} item={i} />)}
            </Row>

        </div>
        
    )
}

export default Store;

{/* <Row xs={1} lg={2} xl={3} xxl={4} className="g-4 justify-content-center container-fluid"> */}