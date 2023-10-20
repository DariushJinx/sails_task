/**
 * Shop.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    id: {
      type: "number",
      autoIncrement: true,
      columnName: "id",
    },
    name: { type: "string", allowNull: false, required: true },
    address: { type: "string", allowNull: false, required: true },
    phone: { type: "number", allowNull: false, required: true },
    RegistrationCode: {
      type: "string",
      allowNull: false,
      required: true,
      unique: true,
    },
    userId: { model: "Users", unique: true },
    products: { collection: "Products", via: "storeId" },
  },
};
