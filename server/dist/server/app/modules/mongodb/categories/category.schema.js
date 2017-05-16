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
exports.categorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    color: { type: String, required: true },
    coords: { type: String, required: true },
    user_id: { type: String, required: true }
});
