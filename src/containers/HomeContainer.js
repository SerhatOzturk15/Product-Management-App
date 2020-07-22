import React, { useState, useReducer, useCallback } from "react";
import { Inventory, ShoppingCart, ProductList, Alert } from "../components";
import uuid from "react-uuid";
import data from "./../data.json";

const HomeContainer = () => {
  const [products, setProducts] = useState(data.products);
  const [newProduct, setNewProduct] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      title: "",
      price: 0,
      imageUrl: "",
      description: "",
    }
  );
  const [alertOn, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState(false);
  const [alertType, setAlertType] = useState("");

  const showAlert = (text, type) => {
    setAlertText(text);
    setShowAlert(true);
    setAlertType(type);
    window.setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  const handleRemoveProduct = (id) => {
    const filteredProducts = products.filter((item) => item.id !== id);
    setProducts(filteredProducts);
    showAlert(`Item has been removed from inventory`, "danger");
  };

  const onProductEdit = (e, id) => {
    const name = e.target.name;
    let newValue = e.target.value;
    const newList = products.map((product) => {
      return product.id === id ? { ...product, [name]: newValue } : product;
    });
    setProducts(newList);
  };

  // check if entered price is valid e.g not number or smaller than 0, if so dont allow
  const onPriceKeyDown = (e, id, type) => {
    const name = e.target.name;
    let newValue = parseInt(e.target.value);
    const regex = new RegExp("^[0-9]+$");
    if (!regex.test(newValue)) {
      if (type === "add") {
        setNewProduct({ [name]: 0 });
      } else {
        const newList = products.map((product) => {
          return product.id === id ? { ...product, [name]: 0 } : product;
        });
        setProducts(newList);
      }
      showAlert("Price must be 0 or a positive number", "danger");
    }
  };

  const handleProductChange = (e) => {
    const name = e.target.name;
    const newValue = e.target.value;
    setNewProduct({ [name]: newValue });
  };

  const handleAddProduct = () => {
    if (
      !newProduct.title ||
      !newProduct.price ||
      !newProduct.description ||
      !newProduct.imageUrl
    ) {
      showAlert(
        "All fields must be filled before adding the product",
        "danger"
      );
      return;
    }
    const newItem = {
      id: uuid(),
      count: 0,
      title: newProduct.title,
      price: newProduct.price,
      imageUrl: newProduct.imageUrl,
      description: newProduct.description,
    };
    setProducts([...products, newItem]);
    showAlert(
      `Item '${newProduct.title}' has been added to inventory`,
      "primary"
    );
    setNewProduct({
      title: "",
      price: 0,
      imageUrl: "",
      description: "",
    });
  };

  const memoizedHandleRemoveFromChart = useCallback(
    (id) => {
      const newProductList = products.map((product) => {
        return product.id === id ? { ...product, count: 0 } : product;
      });
      setProducts(newProductList);
    },
    [products]
  );

  const memoizedHandleAddToChart = useCallback(
    (id) => {
      const newProductList = products.map((product) => {
        return product.id === id
          ? { ...product, count: product.count + 1 }
          : product;
      });
      setProducts(newProductList);
    },
    [products]
  );

  return (
    <>
      <ProductList
        products={products}
        handleAddToChart={memoizedHandleAddToChart}
        header="Product List"
        buttonText="Add to Order"
      />
      <ShoppingCart
        products={products}
        handleRemoveFromChart={memoizedHandleRemoveFromChart}
        header="Shopping Cart"
      />
      <Inventory
        products={products}
        handleAddProduct={handleAddProduct}
        handleRemoveProduct={handleRemoveProduct}
        handleProductChange={handleProductChange}
        newProduct={newProduct}
        onProductEdit={onProductEdit}
        onPriceKeyDown={onPriceKeyDown}
        addNewProductText="Add Product"
        removeProductText="Remove Product"
        header="Inventory"
      />
      {alertOn && <Alert text={alertText} type={alertType} />}
    </>
  );
};

export default HomeContainer;
