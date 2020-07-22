import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

const ShoppingCart = ({ products, handleRemoveFromChart, header }) => {
  const totalPrice = products.reduce((acc, item, index) => {
    return (acc += item.price * item.count);
  }, 0);
  return (
    <div className="category-container shopping-item">
      <h4>{header}</h4>
      {products.map((product) => {
        return ( product.count > 0 &&
          <Card key={product.id}>
            <Card.Body>
              <Row>
                <Col sm={11}>
                  <Row>
                    <Col sm={10}>{product.title}</Col>
                    <Col sm={2}>{`${
                      product.price > 0 ? product.price : 0
                    }$`}</Col>
                  </Row>
                  <Row>
                    <Col sm={10}>Quantity</Col>
                    <Col sm={2}>{product.count}</Col>
                  </Row>
                </Col>
                <Col sm={1}>
                  <label
                    aria-label="Remove from Chart"
                    onClick={() => handleRemoveFromChart(product.id)}
                    className="close"
                  ></label>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        );
      })}
      <div style={{ textAlign: "right", padding: "10px" }}>
        {`Total:   ${totalPrice}`}
      </div>
    </div>
  );
};

export default React.memo(ShoppingCart);
