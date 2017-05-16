/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   24-12-2016
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 01-05-2017
*/
"use strict";
exports.__esModule = true;
var express = require("express");
var items_controller_1 = require("../../mongodb/items/items.controller");
var log_1 = require("../../log");
var router = express.Router();
var ItemsRoutes = (function () {
    function ItemsRoutes() {
        this._ItemsController = items_controller_1.itemController;
    }
    ItemsRoutes.prototype.routes = function () {
        var controller = this._ItemsController;
        router.get('/items', log_1.log, controller.getItems);
        router.get('/items/:id', log_1.log, controller.getItem);
        router.post('/items', log_1.log, controller.addItem);
        router.put('/items/:id', log_1.log, controller.updateItem);
        router["delete"]('/items/:id', log_1.log, controller.deleteItem);
        return router;
    };
    return ItemsRoutes;
}());
exports.ItemsRoutes = ItemsRoutes;
