import { useEffect, useState } from "react";
import { findAll } from "../services/itemService"
import Item from "./Item";
import Row from 'react-bootstrap/Row';

import "../styles/Category.css";

function Items() {

    const [items, setItems] = useState([]);

    useEffect(() => {
        findAll()
            .then(setItems)
            .catch(alert);
    }, []);

    return (
        <div className="itemsStyle" style={{minHeight: "75vh", marginLeft: "230px"}}>
    
            <Row xs={1} lg={2} xl={3} xxl={4} className="g-4 justify-content-center container-fluid">
                {items.map(i => <Item key={i.itemId} item={i} />)}
            </Row>
        
        </div>
    );
}

export default Items;