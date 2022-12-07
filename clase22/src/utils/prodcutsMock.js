import { faker } from "@faker-js/faker";
faker.locale = "es";

let products = [];

export const generateProduct = () => {
  return {
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    thumbnail: faker.image.abstract(),
  };
};

export const createProductsMock = (cant) => {
  products.length = 0;
  for (let i = 0; i < cant; i++) {
    const product = generateProduct();
    product.id = i + 1;
    products.push(product);
  }
  return products;
};
