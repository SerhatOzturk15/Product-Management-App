import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const Inventory = ({
  products = [],
  handleAddProduct,
  handleRemoveProduct,
  handleProductChange,
  onProductEdit,
  newProduct,
  onPriceKeyDown,
  addNewProductText,
  removeProductText,
  header
}) => {
  return (
    <>
      <h4 data-test="inventoryComponent">{header}</h4>
      {products.map((product) => {
        return (
          <Form.Group key={product.id} className="form-element" data-test="product-item">
            <Form.Row>
              <Col>
                <Form.Control
                  data-test="inventory-item"
                  id={product.id}
                  name="title"
                  placeholder="Title"
                  value={product.title}
                  onChange={(e) => onProductEdit(e, product.id)}
                />
              </Col>
              <Col>
                <Form.Control
                  type="number"
                  onBlur={(e) => onPriceKeyDown(e, product.id)}
                  name="price"
                  placeholder="Price"
                  value={product.price}
                  onChange={(e) => onProductEdit(e, product.id)}
                />
              </Col>
            </Form.Row>
            <br />
            <Form.Row>
              <Col>
                <Form.Control
                  name="imageUrl"
                  placeholder="Image Url"
                  value={product.imageUrl}
                  onChange={(e) => onProductEdit(e, product.id)}
                />
              </Col>
            </Form.Row>
            <br />
            <Form.Row>
              <Col>
                <Form.Control
                  name="description"
                  placeholder="Description"
                  value={product.description}
                  onChange={(e) => onProductEdit(e, product.id)}
                />
              </Col>
            </Form.Row>
            <br />
            <Form.Row>
              <Col>
                <Button
                aria-label = 'remove product'
                  variant="danger"
                  data-test="remove-product-button"
                  onClick={() => handleRemoveProduct(product.id)}
                >
                  {removeProductText}
                </Button>
              </Col>
            </Form.Row>
          </Form.Group>
        );
      })}
      <Form.Group className="form-element" data-test="new-product-item">
        <Form.Row>
          <Col>
            <Form.Control
              name="title"
              placeholder="Title"
              value={newProduct.title}
              onChange={handleProductChange}
            />
          </Col>
          <Col>
            <Form.Control
              type="number"
              name="price"
              placeholder="Price"
              value={newProduct.price}
              onChange={handleProductChange}
              onBlur={(e) => onPriceKeyDown(e, 0, "add")}
            />
          </Col>
        </Form.Row>
        <br />
        <Form.Row>
          <Col>
            <Form.Control
              name={"imageUrl"}
              placeholder="Image Url"
              value={newProduct.imageUrl}
              onChange={handleProductChange}
            />
          </Col>
        </Form.Row>
        <br />
        <Form.Row>
          <Col>
            <Form.Control
              name="description"
              placeholder="Description"
              value={newProduct.description}
              onChange={handleProductChange}
            />
          </Col>
        </Form.Row>
        <br />
        <Form.Row>
          <Col>
            <Button aria-label = 'add product' onClick={handleAddProduct} data-test="new-product-button">{addNewProductText}</Button>
          </Col>
        </Form.Row>
      </Form.Group>
    </>
  );
};

export default Inventory;
