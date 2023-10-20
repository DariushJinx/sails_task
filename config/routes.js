/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  "/": { view: "pages/homepage" },
  // user routes
  "POST /user/register": "UsersController.create",
  "POST /user/login": "UsersController.login",
  "GET /user/:id": "UsersController.findOne",
  "GET /user/list": "UsersController.findAll",
  // shop routes
  "POST /shop/create": "ShopController.create",
  "GET /shop/:id": "ShopController.findOne",
  "GET /shop/list": "ShopController.findAll",
  "PUT /shop/:id": "ShopController.updateShop",
  "DELETE /shop/:id": "ShopController.deleteShop",
  // products routes
  "POST /product/create": "ProductsController.create",
  "GET /product/:id": "ProductsController.findOne",
  "GET /product/list": "ProductsController.findAll",
  "PUT /product/:id": "ProductsController.updateShop",
  "DELETE /product/:id": "ProductsController.deleteShop",

  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
};
