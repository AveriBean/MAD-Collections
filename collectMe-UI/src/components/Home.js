import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { findAll, findById } from "../services/itemService";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";

import bg1 from "../images/carousel/toysresize.jpg";
import bg2 from "../images/carousel/sportcardsresize.jpg";
import bg3 from "../images/carousel/carsresize.jpg";
import bg4 from "../images/carousel/nutcrackers.jpg";

function Home() {
  const [items, setItems] = useState([]);
  const [oneItem, setOneItem] = useState("");
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    findAll()
      .then((result) => {
        setItems(result);
        const random = result[Math.floor(Math.random() * result.length)];
        setOneItem(random);
      })
      .catch(alert);
  }, []);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div
      className="container d-flex-row align-content-center justify-content-center mx-auto"
      style={{ minHeight: "75vh" }}
    >
      <div className="col">
        <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item style={{ maxHeight: "650px" }}>
            <img
              className="w-100 h-50"
              style={{ objectFit: "cover" }}
              src={bg1}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item style={{ maxHeight: "650px" }}>
            <img
              className="w-100 h-50"
              style={{ objectFit: "cover" }}
              src={bg2}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item style={{ maxHeight: "650px" }}>
            <img
              className="w-100 h-50"
              style={{ objectFit: "cover" }}
              src={bg3}
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item style={{ maxHeight: "650px" }}>
            <img
              className="w-100 h-50"
              style={{ objectFit: "cover" }}
              src={bg4}
              alt="Fourth slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="d-flex-row align-items-center justify-content-center">
        <h2 className="d-flex justify-content-center">ITEM OF THE DAY</h2>

        <Col className="d-flex justify-content-center">
          <Card style={{ width: "18rem", marginTop: "10px" }}>
            <Card.Img
              style={{ height: "auto", width: "18rem", marginTop: "10px" }}
              src={oneItem.image}
            />
            <Card.Body style={{ textAlign: "center" }}>
              <Card.Title style={{ marginBottom: "10px" }}>
                {oneItem.itemName}
              </Card.Title>
              <Card.Text>
                <b>Description:</b> {oneItem.description}
              </Card.Text>
              <Card.Text>
                <b>Value:</b> ${oneItem.value.toFixed(2)}
              </Card.Text>
              <Card.Text>
                <b>Item Status:</b>
                <div>{oneItem.viewable === true ? "viewable" : ""}</div>
                <div>{oneItem.tradeable === true ? "tradeable" : ""}</div>
                <div>{oneItem.saleable === true ? "saleable" : ""}</div>
                <div>{oneItem.negotiable === true ? "negotiable" : ""}</div>
              </Card.Text>
              <Card.Text>
                <b>Categories:</b>
                <div>
                  {oneItem.categories && oneItem.categories[0].categoryName}
                </div>
              </Card.Text>
              <Card.Footer style={{ textAlign: "center", alignItems: "end" }}>
                <button
                  onClick={() => navigate(`/view/item/${oneItem.itemId}`)}
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
                </button>
              </Card.Footer>
            </Card.Body>
          </Card>
        </Col>
      </div>
    </div>
  );
}

export default Home;
