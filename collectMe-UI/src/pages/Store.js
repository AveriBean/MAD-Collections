import { Button, Container, Navbar, Modal, Row, Col } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { findAll } from "../services/itemService"
import StoreItem from "../components/StoreItem";

function Store() {
    const cart = useContext(CartContext);
    const [storeItems, setStoreItems] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const itemsCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        findAll()
            .then(setStoreItems)
            .catch(alert);
    }, []);


    return (
        <div className="container">

            <Navbar expand="sm" style={{background: "none", position: "static"}}>
                <Navbar.Brand href="/">Collectible Item Store</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end bg-none">
                    <Button onClick={handleShow}>Cart ({itemsCount} Items)</Button>
                </Navbar.Collapse>
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
                            <h1>{currentItem.id}</h1>
                        ))}

                        <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>

                        <Button varian="success">Purchased Items!</Button>
                    </>
                    :
                        <h1>There are no Items in your cart!</h1>
                    }
                    
                </Modal.Body>
            </Modal>


            <h1 align="center" className="p-3">Welcome to Item Checkout!</h1>

            <Row xs={1} lg={2} xl={3} xxl={4} className="g-4 justify-content-center container-fluid">

                {storeItems.map(i => <StoreItem key={i.itemId} item={i} />)}
            </Row>

        </div>
        
    )
}

export default Store;