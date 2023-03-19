"use strict";
exports.__esModule = true;
exports.ProductItemSchema = exports.ProductsSchema = exports.LoginSchema = void 0;
var mongoose_1 = require("mongoose");
var mongoose = mongoose_1["default"];
var Schema = mongoose.Schema;
var loginSchema = new Schema({
    userName: {
        type: String
    },
    password: {
        type: String
    },
    secretKey: [],
    productsId: {
        type: String
    }
});
var productSchema = new Schema({
    productName: {
        type: String
    },
    sellingPrice: {
        type: String
    },
    receivedPrice: {
        type: String
    },
    quantity: {
        type: Number
    }
});
var productsArray = new Schema({
    products: [
        productSchema
    ]
});
exports.LoginSchema = mongoose.model('Users', loginSchema);
exports.ProductsSchema = mongoose.model('Products', productsArray);
exports.ProductItemSchema = mongoose.model('ProducyItemSchema', productSchema);
