/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const verifyToken = require("../policies/verifyToken");
const JWTService = require("../services/JWTService");
const JWT = require("jsonwebtoken");

module.exports = {
  create: async function (req, res) {
    try {
      const body = req.body;
      if (body.userType === "seller" && body.shopAddress === "") {
        return res.status(400).json({
          statusCode: 400,
          data: { message: "فروشنده ملزم به وارد کردن آدرس فروشگاه می باشد" },
        });
      } else if (body.userType === "user" && body.shopAddress.length > 0) {
        return res.status(400).json({
          statusCode: 400,
          data: {
            message: "کاربر عادی قادر به اضافه کردن آدرس فروشگاه نمی باشد",
          },
        });
      }

      const user = await Users.create(body).fetch();
      return res.status(201).json({
        statusCode: 201,
        user,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        statusCode: 400,
        data: { message: "کاربر مورد نظر از قبل وجود دارد" },
      });
    }
  },
  findOne: async function (req, res) {
    try {
      const { id } = req.params;
      const user = await Users.findOne({ id: id }).omit(["password"]);
      return res.status(200).json({
        statusCode: 200,
        data: { user: user },
      });
    } catch (err) {
      return res.serverError(err);
    }
  },
  findAll: async function (req, res) {
    try {
      const users = await Users.find().omit(["password"]);
      if (users.length < 1) {
        return res.status(404).json({
          statusCode: 404,
          data: { message: "any User not found" },
        });
      }
      return res.status(200).json({
        statusCode: 200,
        data: { users: users },
      });
    } catch (err) {
      return res.serverError(err);
    }
  },
  login: async function (req, res) {
    try {
      const body = req.body;
      const user = await Users.findOne({ email: body.email });
      if (!user) {
        return res.status(404).json({
          statusCode: 404,
          data: { message: "User not found" },
        });
      }
      if (body.password !== user.password) {
        return res.status(401).json({
          statusCode: 401,
          data: { message: "The information sent is not correct" },
        });
      }
      const token = JWTService.generateToken(user.email);
      user.password = null;
      return res.status(200).json({
        statusCode: 200,
        user: { ...user, token: token },
      });
    } catch (err) {
      return res.serverError(err);
    }
  },
};
