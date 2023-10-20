/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "users",
  attributes: {
    id: {
      type: "number",
      autoIncrement: true,
      columnName: "id",
    },
    firstName: {
      type: "string",
      required: true,
      allowNull: false,
    },
    lastName: {
      type: "string",
      required: true,
      allowNull: false,
    },
    password: {
      type: "string",
      required: true,
      allowNull: false,
    },
    mobile: {
      type: "number",
      required: true,
      allowNull: false,
    },
    email: {
      type: "string",
      required: true,
      allowNull: false,
      unique: true,
    },
    shopAddress: {
      type: "string",
      required: false,
      allowNull: true,
    },
    userType: {
      type: "string",
      required: true,
      allowNull: false,
    },
    shops: { collection: "shop", via: "userId" },
  },
};
