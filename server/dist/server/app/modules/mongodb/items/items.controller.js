/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   21-12-2016
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 01-05-2017
*/
"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var item_model_1 = require("./item.model");
var authentication_1 = require("../../authentication");
var toObjectId = function (_id) {
    return mongoose.Types.ObjectId.createFromHexString(_id);
};
exports.itemController = {
    getItems: function (req, res) {
        authentication_1.Authentication.checkAuthentication(req, function (isAuth) {
            if (isAuth) {
                var _uid = isAuth.user._id;
                item_model_1.Item
                    .find({ user_id: _uid.toString() })
                    .exec(function (err, docs) {
                    if (err)
                        return console.log(err);
                    res.json(docs);
                });
            }
            else {
                res.json([]);
            }
        });
    },
    getItem: function (req, res) {
        item_model_1.Item.findById(toObjectId(req.params.id), function (err, doc) {
            if (err)
                return console.log(err);
            res.json(doc);
        });
    },
    deleteItem: function (req, res) {
        item_model_1.Item.findByIdAndRemove(toObjectId(req.params.id), function (err, doc) {
            if (err)
                return console.log(err);
            res.json(doc);
        });
    },
    addItem: function (req, res) {
        authentication_1.Authentication.checkAuthentication(req, function (isAuth) {
            if (isAuth) {
                var _uid = isAuth.user._id;
                var newItem = req.body;
                newItem.user_id = _uid;
                (new item_model_1.Item(newItem)).save(function (err, doc) {
                    if (err)
                        return console.log(err);
                    res.json(doc);
                });
            }
            else {
                return console.log('error add item');
            }
        });
    },
    updateItem: function (req, res) {
        var updateItem = req.body;
        delete updateItem._id;
        item_model_1.Item.update({ _id: toObjectId(req.params.id) }, updateItem, function (err, doc) {
            if (err)
                return console.log(err);
            updateItem._id = req.params.id;
            var response = {
                result: true,
                response: updateItem
            };
            res.json(response);
        });
    }
};
