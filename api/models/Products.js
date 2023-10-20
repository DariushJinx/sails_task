/**
 * Products.js
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
    price: { type: "number", allowNull: false, required: true },
    numberOfInventory: { type: "number", allowNull: false, required: true },
    description: { type: "string", allowNull: false, required: true },
    storeId: { model: "Shop", unique: true },
  },
};
