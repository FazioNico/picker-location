/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   21-12-2016
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 20-04-2017
*/
"use strict";
exports.__esModule = true;
var development_1 = require("../../environments/development");
var production_1 = require("../../environments/production");
function environmentConfig() {
    var env = development_1.devVariables;
    if (process.env.NODE_ENV === 'prod') {
        env = production_1.prodVariables;
    }
    return env;
}
exports.environmentConfig = environmentConfig;
exports.SECRET_TOKEN_KEY = 'this is a bad secret sentence';
exports.DB_NAME = environmentConfig().dbName;
exports.DB_HOST = environmentConfig().dbHost;
exports.BCRYPT_ROUND = 10;
exports.PASSWORD_MIN_LENGHT = 6;
exports.JWT_EXPIRE = 86400000;
