import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Cat from "./../../cat.png";

const ProductList = ({ products, handleAddToChart, header, buttonText }) => {
  return (
    <div className="category-container">
      <h4>{header}</h4>
      {products.map((product) => {
        return (
          <Card key={product.id} style={{ margin: "10px 200px" }}>
            <Card.Body>
              <Row>
                <Col sm={2}>
                  <Card.Img
                    style={{
                      width: "120px",
                      height: "120px",
                      display: "inline-block",
                      borderRadius: "16px",
                    }}
                    variant="left"
                    src={Cat}
                  />
                </Col>
                <Col sm={10}>
                  <Row>
                    <Col sm={11}>
                      <Card.Title>{product.title}</Card.Title>
                    </Col>
                    <Col sm={1}>
                      <Card.Text>{`${
                        product.price > 0 ? product.price : 0
                      }$`}</Card.Text>
                    </Col>
                  </Row>
                  <Card.Text>{product.description}</Card.Text>
                  <Button
                    aria-label = 'Add to Chart'
                    onClick={() => handleAddToChart(product.id)}
                    variant="primary"
                  >
                    {buttonText}
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default React.memo(ProductList);
