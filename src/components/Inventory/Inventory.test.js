import React from "react";
import { shallow } from "enzyme";
import Inventory from "./Inventory";
import { findByTestAttr } from "./../../Util";

const setUp = (props = {}) => {
  const component = shallow(<Inventory {...props} />);
  return component;
};

describe("ConfirmationBanner Component", () => {

  describe("with props no products", () => {
    let component;
    beforeEach(() => {
      const props = {
        products: [],
        newProduct: {}
      };
      component = setUp(props);
    });
    test("inventoryComponent should render without errors", () => {
        const wrapper = findByTestAttr(component, "inventoryComponent");
        expect(wrapper.length).toBe(1);
      });
      test("there should not be products in inventory", () => {
        const wrapper = findByTestAttr(component, "product-item");
        expect(wrapper.length).toBe(0);
      });
      test("add product button should render", () => {
        const wrapper = findByTestAttr(component, "new-product-button");
        expect(wrapper.length).toBe(1);
      });
      test("remove product button should not render", () => {
        const wrapper = findByTestAttr(component, "remove-product-button");
        expect(wrapper.length).toBe(0);
      });
  });
  describe("with 2 products", () => {
    let component;
    beforeEach(() => {
      const props = {
        products:   [
            {
              "id": 1,
              "title": "Title of Item 1",
              "price": 24,
              "imageUrl": "url 1",
              "description": "Description lorem ipsum Lorem ipsum lorem ipsum",
              "count": 0
            },
            {
              "id": 2,
              "title": "Title of Item 2",
              "price": 34,
              "imageUrl": "url 2",
              "description": "Description lorem ipsum Lorem ipsum lorem ipsum",
              "count": 0
            }
          ],
        newProduct:     {
            title: "",
            price: 0,
            imageUrl: "",
            description: "",
          },
          removeProductText: 'Remove Product',
          addNewProductText: 'Add Product',
          header: 'Inventory'
      };
      component = setUp(props);
    });
    test("inventoryComponent should render without errors", () => {
        const wrapper = findByTestAttr(component, "inventoryComponent");
        expect(wrapper.length).toBe(1);
      });
      test("it should have 2 product inventory item", () => {
        const wrapper = findByTestAttr(component, "product-item");
        expect(wrapper.length).toBe(2);
      });
      test("first item should return correctly", () => {
        const wrapper = findByTestAttr(component, "inventory-item");
        expect(wrapper.first().props().value).toEqual("Title of Item 1");
      });
      test("add product button should work correctly", () => {
        const wrapper = findByTestAttr(component, "new-product-button");
        expect(wrapper.text()).toEqual("Add Product");
      });
      test("remove product button should work correctly", () => {
        const wrapper = findByTestAttr(component, "remove-product-button");
        expect(wrapper.first().text()).toEqual("Remove Product");
      });
    test("inventoryComponent text should print correctly", () => {
      const wrapper = findByTestAttr(component, "inventoryComponent");
      expect(wrapper.text()).toEqual("Inventory");
    });
  });
});