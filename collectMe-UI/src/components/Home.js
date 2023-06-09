import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { findAll, findById } from "../services/itemService";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import "../styles/Carousel.css";

import bg1 from "../images/carousel/toysresize.jpg";
import bg2 from "../images/carousel/sportcardsresize.jpg";
import bg3 from "../images/carousel/carsresize.jpg";
import bg4 from "../images/carousel/nutcrackers.jpg";

function Home() {
  const [items, setItems] = useState([]);
  const [wait, setWait] = useState(true);
  const [oneItem, setOneItem] = useState("");
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    findAll()
      .then((result) => {
        setItems(result);
        const random = result[Math.floor(Math.random() * result.length)];
        setOneItem(random);
        setWait(false);
      })
      .catch(alert);
  }, []);

  if (wait) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div
      className="container d-flex-row align-content-center justify-content-center"
      style={{ minHeight: "75vh" }}
    >
      <div className="carouselStyle">
        <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item style={{ maxHeight: "575" }}>
            <img
              className="w-100 h-50"
              style={{ objectFit: "cover" }}
              src={bg1}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item style={{ maxHeight: "575" }}>
            <img
              className="w-100 h-50"
              style={{ objectFit: "cover" }}
              src={bg2}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item style={{ maxHeight: "575" }}>
            <img
              className="w-100 h-50"
              style={{ objectFit: "cover" }}
              src={bg3}
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item style={{ maxHeight: "575" }}>
            <img
              className="w-100 h-50"
              style={{ objectFit: "cover" }}
              src={bg4}
              alt="Fourth slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="carouselStyle d-flex-row align-items-center justify-content-center">
        <h2 className="d-flex justify-content-center p-3">FEATURED ITEM</h2>

        <Col className="d-flex justify-content-center">
          <Card
            style={{
              width: "20rem",
              marginBottom: "10px",
              marginTop: "10px",
              boxShadow: "0 0 3px 2px #cec7c759",
              alignItems: "center",
            }}
          >
            <Card.Img
              style={{
                height: "auto",
                width: "18rem",
                marginTop: "10px",
              }}
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
                <b>Value:</b> ${oneItem.value && oneItem.value.toFixed(2)}
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
              <Card.Text style={{ textAlign: "center", alignItems: "end" }}>
                <button
                  onClick={() => navigate(`/view/item/${oneItem.itemId}`)}
                  className="btn dark-pop"
                >
                  View Item
                </button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </div>
    </div>
  );
}

export default Home;
