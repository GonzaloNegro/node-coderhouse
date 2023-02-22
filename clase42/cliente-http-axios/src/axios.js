import axios from "axios";

const listProductsAxios = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/list");
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
};

const data = {
  id: "15",
  timestamp: "2023-02-21 17:30:00",
  title: "productos Axios",
  description: "producto Axios",
  code: "producto Axios",
  photo: "producto Axios",
  value: 100,
  stock: 100,
};

export const addProductsAxios = async () => {
  try {
    const response = await axios.post("http://localhost:8080/api/add", data);
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
};

const dataUpdated = {
  timestamp: "2023-02-21 17:30:00",
  title: "productos Axios",
  description: "producto Axios",
  code: "producto Axios",
  photo: "producto Axios",
  value: 100,
  stock: 100,
};

export const updateProductsAxios = async () => {
  try {
    const response = await axios.put(
      "http://localhost:8080/api/6",
      dataUpdated
    );
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProdcutAxios = async () => {
  try {
    const response = await axios.delete("http://localhost:8080/api/5");
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

await addProductsAxios();
await listProductsAxios();
await deleteProdcutAxios();
await listProductsAxios();
await updateProductsAxios();
await listProductsAxios();
