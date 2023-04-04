import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { findAll } from "../services/itemService";
import Item from "./Item";
import Row from "react-bootstrap/Row";

function Items() {
  const [items, setItems] = useState([]);
  const [wait, setWait] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    findAll()
      .then((result) => {
        setItems(result);
        setWait(false);
      })
      .catch(() => navigate("/500"));
  }, []);

  if (wait) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <div className="container">
      <Row xs={1} lg={4} className="g-4 justify-content-center container-fluid">
        {items.map((i) => (
          <Item key={i.itemId} item={i} />
        ))}
      </Row>
    </div>
  );
}

export default Items;
