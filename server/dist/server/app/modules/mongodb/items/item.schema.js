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
exports.itemSchema = new mongoose.Schema({
    description: { type: String, required: true },
    coords: {
        lat: { type: Number },
        lng: { type: Number }
    },
    user_id: { type: String, required: true },
    category: { type: String, required: true },
    datetime: { type: Number, "default": Date.now() }
});
