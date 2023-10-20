/**
 * ProductsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async function (req, res) {
    try {
      const body = req.body;
      const product = await Products.create(body).fetch();
      return res.status(201).json({
        statusCode: 201,
        product: product,
      });
    } catch (err) {
      return res.serverError(err);
    }
  },
  findOne: async function (req, res) {
    try {
      const product = await Products.findOne(req.params.id).populate("storeId");
      if (!product) {
        return res.status(404).json({
          statusCode: 404,
          data: { message: "Products not found" },
        });
      }
      return res.status(200).json({
        statusCode: 200,
        data: { product: product },
      });
    } catch (err) {
      return res.serverError(err);
    }
  },
  findAll: async function (req, res) {
    try {
      const products = await Products.find();
      if (!products.length) {
        return res.status(404).json({
          statusCode: 404,
          data: { message: "any Products not found" },
        });
      }
      return res.status(200).json({
        statusCode: 200,
        data: { products: products },
      });
    } catch (err) {
      return res.serverError(err);
    }
  },
  updateShop: async function (req, res) {
    try {
      const { id } = req.params;
      const product = await Products.updateOne({ id: id }).set(req.body);
      if (!product) {
        return res.status(404).json({
          statusCode: 404,
          data: { message: "Products not found" },
        });
      }
      return res.status(200).json({
        statusCode: 200,
        data: { product: product },
      });
    } catch (err) {
      return res.serverError(err);
    }
  },
  deleteShop: async function (req, res) {
    try {
      const { id } = req.params;
      const product = await Products.destroyOne({ id: id });
      if (!product) {
        return res.status(404).json({
          statusCode: 404,
          data: { message: "Products not found" },
        });
      }
      return res.status(200).json({
        statusCode: 200,
        data: { message: "delete product successfully..." },
      });
    } catch (err) {
      return res.serverError(err);
    }
  },
};
