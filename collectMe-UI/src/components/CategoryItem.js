import { Card, Col, Row } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

import { findByCategoryId } from "../services/itemService";

function CategoryItem() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (categoryId) {
      findByCategoryId(categoryId)
        .then(setItems)
        .catch(() => navigate("/500"));
    }
  }, [categoryId, navigate]);

  return (
    <div
      className="container d-flex-row justify-content-center"
      style={{ minHeight: "75vh", marginLeft: "230px", marginBottom: "10px" }}
    >
      <div className="d-flex justify-content-center align-content-center">
        <h2>
          {items.length > 0
            ? items[0].categories[0].categoryName
            : navigate("/")}
        </h2>
      </div>

      <Row className="g-4 d-flex justify-content-center">
        {items.map((i) => (
          <Col
            key={"item-" + i.itemId}
            className="d-flex justify-content-center"
          >
            <Card
              style={{
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 0 3px 2px #cec7c759",
                alignItems: "center",
                width: "18rem",
                marginTop: "10px",
              }}
            >
              <Card.Img
                style={{ width: "16rem", marginTop: "10px", height: "auto" }}
                src={i.image}
              />
              <Card.Body
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <Card.Title style={{ marginBottom: "10px" }}>
                  <b>{i.itemName}</b>
                </Card.Title>
                <Card.Text>
                  <b>Description:</b> {i.description}
                </Card.Text>
                <Card.Text>
                  <b>Value:</b> ${i.value.toFixed(2)}
                </Card.Text>
                <Card.Text>
                  <b>Item Status:</b>
                  {i.actions.map((a) => (
                    <div key={a.actionId}>{a.status}</div>
                  ))}
                </Card.Text>
                <Card.Text>
                  <b>Categories:</b>
                  {i.categories.map((c) => (
                    <div key={c.categoryId}>{c.categoryName}</div>
                  ))}
                <Card.Text>
                <Card.Text className="mt-auto">
                  <Link to={`/view/item/${i.itemId}`} className="btn dark-pop">
                    View Item
                  </Link>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default CategoryItem;
