import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { findAll } from "../services/itemService";
import Item from "./Item";
import Row from "react-bootstrap/Row";

import "../styles/Category.css";

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
    <div className="">

      <div><h1 className="text-center p-3">Current List of Items:</h1></div>

      <div
        className="itemsStyle"
        style={{ minHeight: "75vh", marginLeft: "230px" }}
      >
        <Row
          xs={1}
          lg={2}
          xl={3}
          xxl={4}
          className="g-4 justify-content-center container-fluid"
        >
          {items.map((i) => (
            <Item key={i.itemId} item={i} />
          ))}
        </Row>
      </div>
    </div>

  );
}

export default Items;
