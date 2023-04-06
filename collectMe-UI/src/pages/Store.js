import { Button, Container, Navbar, Modal, Row, Col } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { findAll } from "../services/itemService"
import StoreItem from "../components/StoreItem";
import ItemCart from "../components/ItemCart";

import "../styles/Category.css";

function Store() {
    const cart = useContext(CartContext);
    const [storeItems, setStoreItems] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const itemsCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    const checkout = async() => {
        await fetch('http://localhost:8080/api/checkout', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({items: cart.items})
        }).then((response) => {
            return response.json();
        });
    }

    useEffect(() => {
        findAll()
            .then(setStoreItems)
            .catch(alert);
    }, []);


    return (
        <div>

            <Navbar className="container justify-content-end"expand="sm" style={{background: "none", position: "static"}}>
                <p>
                    <Button onClick={handleShow}>Cart ({itemsCount} Items)</Button>
                </p>
            </Navbar>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {itemsCount > 0 ? 
                    <>
                        <p> Items in your cart: </p>
                        {cart.items.map((currentItem, idx) => (
                            <ItemCart key={idx} id={currentItem.id} quantity={currentItem.quantity}></ItemCart>
                        ))}

                        <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>

                        <Button variant="success" onClick={checkout}>Purchase Items?</Button>
                    </>
                    :
                        <h1>There are no Items in your cart!</h1>
                    }
                    
                </Modal.Body>
            </Modal>


            <h1 align="center" className="p-3">Welcome to Item Checkout!</h1>

            <Row xs={1} lg={2} xl={3} xxl={4} className="storeStyle g-4 justify-content-center" style={{ minHeight: "75vh", marginLeft: "230px" }}>

                {storeItems.map(i => <StoreItem key={i.itemId} item={i} />)}
            </Row>

        </div>
        
    )
}

export default Store;