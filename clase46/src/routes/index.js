import Router from "koa-router";
import ProductRouter from "./products.routes.js";

const router = new Router({
  prefix: "/api",
});

router.use(ProductRouter);

router.get("/", (ctx) => {
  console.log(ctx);
});

export default router.routes();
