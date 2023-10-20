/**
 * ShopController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async function (req, res) {
    try {
      const body = req.body;
      const shop = await Shop.create(body).fetch();
      return res.status(201).json({
        statusCode: 201,
        shop: shop,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        statusCode: 400,
        data: { message: "کد ثبتی محصول از قبل وجود دارد" },
      });
    }
  },
  findOne: async function (req, res) {
    try {
      const shop = await Shop.findOne(req.params.id).populate("userId");
      if (!shop) {
        return res.status(404).json({
          statusCode: 404,
          data: { message: "Shop not found" },
        });
      }
      return res.status(200).json({
        statusCode: 200,
        data: { shop: shop },
      });
    } catch (err) {
      return res.serverError(err);
    }
  },
  findAll: async function (req, res) {
    try {
      const shops = await Shop.find().populate("userId");
      if (!shops.length) {
        return res.status(404).json({
          statusCode: 404,
          data: { message: "any Shop not found" },
        });
      }
      return res.status(200).json({
        statusCode: 200,
        data: { shops: shops },
      });
    } catch (err) {
      return res.serverError(err);
    }
  },
  updateShop: async function (req, res) {
    try {
      const { id } = req.params;
      const user = await Users.findOne({ email: req.user.email });
      const shopFind = await Shop.findOne({ id: id });
      if (shopFind.userId === user.id) {
        const shop = await Shop.updateOne({ id: id }).set(req.body);
        if (!shop) {
          return res.status(404).json({
            statusCode: 404,
            data: { message: "Shop not found" },
          });
        }
        return res.status(200).json({
          statusCode: 200,
          data: { shop: shop },
        });
      } else {
        return res.status(401).json({
          statusCode: 401,
          err: { message: "شما مجاز به تغییر دادن مشخصات فروشگاه نمی باشید" },
        });
      }
    } catch (err) {
      return res.serverError(err);
    }
  },
  deleteShop: async function (req, res) {
    try {
      const { id } = req.params;
      const shop = await Shop.destroyOne({ id: id });
      if (!shop) {
        return res.status(404).json({
          statusCode: 404,
          data: { message: "Shop not found" },
        });
      }
      return res.status(200).json({
        statusCode: 200,
        data: { message: "delete shop successfully..." },
      });
    } catch (err) {
      return res.serverError(err);
    }
  },
};
