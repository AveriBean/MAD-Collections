import { useEffect, useState } from "react";
import { findAll, findById } from "../services/itemService";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

function Home () {

    const [items, setItems] = useState([]);
    const [oneItem, setOneItem] = useState('');

    useEffect(() => {
        findAll()
            .then(result => {
               setItems(result)
               const random = result[Math.floor(Math.random() * result.length)];
               setOneItem(random);
            } )
            .catch(alert);
    }, []);

    function random() {
        const random = items[Math.floor(Math.random() * items.length)];
        setOneItem(random);
        return oneItem;
    }

    return (
        <div className="d-flex-row align-content-center justify-content-center" style={{minHeight: "75vh"}}>
            <h2 className="d-flex justify-content-center">ITEM OF THE DAY</h2>
            
            <Col className="d-flex justify-content-center">
            <Card style={{ width: "18rem", marginTop: "10px" }}>
                <Card.Img src={oneItem.image} />
                <Card.Body style={{ textAlign: "center" }}>
                <Card.Title style={{ marginBottom: "10px" }}>
                    {oneItem.itemName}
                </Card.Title>
                <Card.Text>Description: {oneItem.description}</Card.Text>
                <Card.Text>Value: {oneItem.value}</Card.Text>
                {/* <Card.Text>
                    Item Status:
                    {oneItem.actions.map((a) => (
                    <h6>{oneItem.status}</h6>
                    ))}
                </Card.Text>
                <Card.Text>
                    Categories:
                    {oneItem.categories.map((c) => (
                    <h6>{oneItem.categoryName}</h6>
                    ))}
                </Card.Text> */}
                </Card.Body>
            </Card>
            </Col>
    
        </div>
    )
}

export default Home;