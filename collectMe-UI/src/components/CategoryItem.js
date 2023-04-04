import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { findByCategoryId } from "../services/itemService";

function CategoryItem() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const { categoryId } = useParams();


  useEffect(() => {
    if(categoryId) {
      findByCategoryId(categoryId)
        .then((setItems))
        .catch(() => navigate("/500"));
    }
  }, [categoryId, navigate]);
 
  return (
    <div className="container d-flex-row justify-content-center" style={{minHeight: "75vh"}}>

      <div className="d-flex justify-content-center align-content-center">
        <h2>{items.length > 0 ? items[0].categories[0].categoryName : navigate("/")}</h2>
      </div>

      <div className="g-4 d-flex justify-content-center">
        {items.map((i) => (
          <Col key={"item-"+i.itemId} className="d-flex justify-content-center">
            <Card style={{ width: "18rem", marginTop: "10px" }}>
              <Card.Img src={i.image} />
              <Card.Body style={{ textAlign: "center" }}>
                <Card.Title style={{ marginBottom: "10px" }}>
                  <b>{i.itemName}</b>
                </Card.Title>
                <Card.Text>Description: {i.description}</Card.Text>
                <Card.Text>Value: {i.value}</Card.Text>
                <Card.Text>
                  <b>Item Status:</b>
                  {i.actions.map((a) => (
                    <div>{a.status}</div>
                  ))}
                </Card.Text>
                <Card.Text>
                  <b>Categories:</b>
                  {i.categories.map((c) => (
                    <div>{c.categoryName}</div>
                  ))}
                </Card.Text>
                <Card.Text>
                  <Link to="/view/item" className="btn btn-info">
                    View
                  </Link>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </div>

    </div>
  );
}

export default CategoryItem;



