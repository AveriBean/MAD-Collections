import { Button, Container, Navbar, Modal, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { findAll } from "../services/itemService"
import Item from "../components/Item";

function Store() {

    const [items, setItems] = useState([]);

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
                    <Button>Cart 0 Items</Button>
                </Navbar.Collapse>
            </Navbar>


            <h1 align="center" className="p-3">Welcome to Item Checkout!</h1>

            <Row xs={1} md={3} className="g-4">
                {items.map(i => <Item key={i.itemId} item={i} />)}
            </Row>

        </div>
        
    )
}

export default Store;