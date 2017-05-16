/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   22-12-2016
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 06-05-2017
*/
"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
// Import Schemas
var category_schema_1 = require("./category.schema");
// Define & export Mongoose Model with Interface
exports.Category = mongoose.model('categories', category_schema_1.categorySchema);
