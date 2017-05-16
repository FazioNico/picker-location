/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   21-12-2016
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 07-05-2017
*/
"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var category_model_1 = require("./category.model");
var item_model_1 = require("../items/item.model");
var authentication_1 = require("../../authentication");
var toObjectId = function (_id) {
    return mongoose.Types.ObjectId.createFromHexString(_id);
};
exports.categoriesController = {
    getCategories: function (req, res) {
        authentication_1.Authentication.checkAuthentication(req, function (isAuth) {
            if (isAuth) {
                var _uid = isAuth.user._id;
                category_model_1.Category
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
    getCategory: function (req, res) {
        category_model_1.Category.findById(toObjectId(req.params.id), function (err, doc) {
            if (err)
                return console.log(err);
            res.json(doc);
        });
    },
    deleteCategory: function (req, res) {
        category_model_1.Category.findByIdAndRemove(toObjectId(req.params.id), function (err, doc) {
            if (err)
                return console.log(err);
            res.json(doc);
        });
    },
    addCategory: function (req, res) {
        authentication_1.Authentication.checkAuthentication(req, function (isAuth) {
            if (isAuth) {
                var _uid = isAuth.user._id;
                var newCategory = req.body.cat;
                var newItem_1 = req.body.item;
                newCategory.user_id = _uid;
                (new category_model_1.Category(newCategory)).save(function (err, docCat) {
                    if (err)
                        return console.log(err);
                    // No error-> save Item category
                    newItem_1.category = docCat._id;
                    (new item_model_1.Item(newItem_1)).save(function (err, docItem) {
                        if (err)
                            return console.log(err);
                        // return docItem result success
                        //res.json(docItem);
                        res.json(docItem);
                    });
                    //res.json(docCat);
                });
            }
            else {
                return console.log('error add item');
            }
        });
    },
    updateCategory: function (req, res) {
        var updateCategory = req.body;
        delete updateCategory._id;
        category_model_1.Category.update({ _id: toObjectId(req.params.id) }, updateCategory, function (err, doc) {
            if (err)
                return console.log(err);
            updateCategory._id = req.params.id;
            var response = {
                result: true,
                response: updateCategory
            };
            res.json(response);
        });
    }
};
