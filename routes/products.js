const express = require("express");
const productRouter = express.Router();
const { productSchema } = require("../middleware/validate");
const verifyToken = require("../middleware/auth");
const {
  getProducts,
  productById,
  addProduct,
  editProduct,
  deleteProduct,
} = require("../controller/product.js");

productRouter.get("/products", verifyToken, getProducts);

productRouter.get("/products/:id", verifyToken, productById);

productRouter.post("/products", verifyToken, productSchema, addProduct);

productRouter.put("/products/:id", verifyToken, editProduct);

productRouter.delete("/products/:id", verifyToken, deleteProduct);

module.exports = productRouter;
