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
var category_controller_1 = require("../../mongodb/categories/category.controller");
var log_1 = require("../../log");
var router = express.Router();
var CategoriesRoutes = (function () {
    function CategoriesRoutes() {
        this._CategoriesController = category_controller_1.categoriesController;
    }
    CategoriesRoutes.prototype.routes = function () {
        var controller = this._CategoriesController;
        router.get('/categories', log_1.log, controller.getCategories);
        router.get('/categories/:id', log_1.log, controller.getCategory);
        router.post('/categories', log_1.log, controller.addCategory);
        router.put('/categories/:id', log_1.log, controller.updateCategory);
        router["delete"]('/categories/:id', log_1.log, controller.deleteCategory);
        return router;
    };
    return CategoriesRoutes;
}());
exports.CategoriesRoutes = CategoriesRoutes;
