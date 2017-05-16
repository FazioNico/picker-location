/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   22-12-2016
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 01-05-2017
*/
"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
// Import Schemas
var item_schema_1 = require("./item.schema");
// Define & export Mongoose Model with Interface
exports.Item = mongoose.model('items', item_schema_1.itemSchema);
