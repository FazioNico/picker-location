/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   24-12-2016
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 06-05-2017
*/
"use strict";
exports.__esModule = true;
var express = require("express");
var itemsRoutes_1 = require("../api/items/itemsRoutes");
var users_routes_1 = require("../api/users/users.routes");
var categoriesRoutes_1 = require("../api/categories/categoriesRoutes");
var app = express();
var APIRoutes = (function () {
    function APIRoutes() {
    }
    APIRoutes.prototype.routes = function () {
        app.use("/", new itemsRoutes_1.ItemsRoutes().routes());
        app.use("/", new users_routes_1.UsersRoutes().routes());
        app.use("/", new categoriesRoutes_1.CategoriesRoutes().routes());
        return app;
    };
    return APIRoutes;
}());
exports.APIRoutes = APIRoutes;
