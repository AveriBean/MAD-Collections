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
      style={{ minHeight: "75vh" }}
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
            <Card style={{ width: "18rem", marginTop: "10px" }}>
              <Card.Img
                style={{ height: "auto", width: "18rem", marginTop: "10px" }}
                src={i.image}
              />
              <Card.Body style={{ textAlign: "center" }}>
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
                </Card.Text>
                <Card.Footer style={{ textAlign: "center", alignItems: "end" }}>
                  <Link
                    to={`/view/item/${i.itemId}`}
                    style={{
                      background: "black",
                      border: "1px solid lightsteelblue",
                      color: "#D3D3D3",
                      margin: "5%",
                      boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)",
                    }}
                    className="btn btn-info"
                  >
                    View Item
                  </Link>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default CategoryItem;
