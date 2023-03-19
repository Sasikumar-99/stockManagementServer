"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductItemSchema = exports.ProductsSchema = exports.LoginSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose = mongoose_1.default;
const Schema = mongoose.Schema;
const loginSchema = new Schema({
    userName: {
        type: String
    },
    password: {
        type: String
    },
    secretKey: [],
    productsId: {
        type: String
    },
});
const productSchema = new Schema({
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
const productsArray = new Schema({
    products: [
        productSchema
    ]
});
exports.LoginSchema = mongoose.model('Users', loginSchema);
exports.ProductsSchema = mongoose.model('Products', productsArray);
exports.ProductItemSchema = mongoose.model('ProducyItemSchema', productSchema);
//# sourceMappingURL=model.js.map