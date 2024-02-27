const express = require("express");
const productModel = require("../models/productModel");
const asyncHandler = require("express-async-handler");

const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await productModel.find({});
    return res.status(200).json({
      data: products,
      success: true,
      message: "All the products available",
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

const productById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    res.status(200).json({
      success: true,
      data: product,
      message: "Product found successfully",
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

const addProduct = asyncHandler(async (req, res) => {
  try {
    const product = await productModel.create(req.body);
    res.status(200).json({
      success: true,
      data: product,
      message: "Product created successfully",
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

const editProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Cannot find any product with the id ${id}`,
      });
    }
    const newProduct = await productModel.findById(id);
    res.status(200).json({
      success: true,
      data: newProduct,
      message: "Product edited successfully",
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Cannot find any product with the id ${id}`,
      });
    }
    res.status(200).json({
      success: true,
      data: product,
      message: "Product found successfully",
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = {
  getProducts,
  productById,
  addProduct,
  editProduct,
  deleteProduct,
};
