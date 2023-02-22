import mongoose from "mongoose";
import app from "../server.js";
import request from "supertest";
import { productsSchema } from "../persistence/daos/dao-mongodb/schema/products.schema";

let productsModel = mongoose.model("productos", productsSchema);

describe("Tests server products", () => {
  beforeEach(async () => {
    await mongoose.connection.collections["productos"].drop();
  });

  it("create products", async () => {
    const doc = {
      id: "50",
      timestamp: "2023-02-21 17:30:00",
      title: "producto Supertest",
      description: "producto Supertest",
      code: "producto Supertest",
      photo: "producto Supertest",
      value: 100,
      stock: 100,
    };
    const response = await request(app).post("/api/add").send(doc);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(doc.title);
    expect(response.body.description).toBe(doc.description);
  });

  it("get all products", async () => {
    const doc = {
      id: "50",
      timestamp: "2023-02-21 17:30:00",
      title: "producto Supertest",
      description: "producto Supertest",
      code: "producto Supertest",
      photo: "producto Supertest",
      value: 100,
      stock: 100,
    };
    await productsModel.create(doc);
    const response = await request(app).get("/api/list");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].title).toBe(doc.title);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0].title).toEqual(
      expect.stringContaining("producto Supertest")
    );
  });

  it("update product", async () => {
    const doc = {
      id: "50",
      timestamp: "2023-02-21 17:30:00",
      title: "producto Supertest",
      description: "producto Supertest",
      code: "producto Supertest",
      photo: "producto Supertest",
      value: 100,
      stock: 100,
    };
    const responseProduct = await productsModel.create(doc);
    const docUpdated = {
      timestamp: "2023-02-21 17:30:00",
      title: "producto Supertest Modificado",
      description: "producto Supertest Modificado",
      code: "producto Supertest Modificado",
      photo: "producto Supertest Modificado",
      value: 100,
      stock: 100,
    };
    const response = await request(app).put("/api/50").send(docUpdated);
    expect(response.statusCode).toBe(200);
  });

  it("delete product", async () => {
    const doc = {
      id: "50",
      timestamp: "2023-02-21 17:30:00",
      title: "producto Supertest",
      description: "producto Supertest",
      code: "producto Supertest",
      photo: "producto Supertest",
      value: 100,
      stock: 100,
    };
    const responseCreate = await productsModel.create(doc);
    const response = await request(app).delete("/api/50");
    expect(response.statusCode).toBe(200);
  });
});
