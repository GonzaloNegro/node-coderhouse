import {
  saveProduct,
  getAllProducts,
  updateProductById,
  deleteProductById,
} from "../services/products.services.js";

export const saveController = async (ctx, next) => {
  const data = ctx.request.body;
  const result = await saveProduct(data);
  ctx.body = {
    status: "success",
    data: result,
  };
  ctx.status = 201;
};

export const getAllController = async (ctx, next) => {
  ctx.body = {
    status: "success",
    data: await getAllProducts(),
  };
  ctx.status = 200;
};

export const updateProductByIdController = async (ctx, next) => {
  const { id } = ctx.params;
  const { title, description, code, photo, value, stock } = ctx.request.body;
  const data = await updateProductById(
    id,
    title,
    description,
    code,
    photo,
    value,
    stock
  );
  ctx.body = {
    status: "success",
    data: data,
  };
  ctx.status = 200;
};

export const deleteProductByIdController = async (ctx, next) => {
  const { id } = ctx.params;
  const data = await deleteProductById(id);
  ctx.status = 200;
  ctx.body = {
    status: "success",
    message: `prodcuto eliminado con id: ${id}`,
    data: data,
  };
};
