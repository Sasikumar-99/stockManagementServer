"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Controller = void 0;
var model_1 = require("../model/model");
var Controller = /** @class */ (function () {
    function Controller() {
        var _this = this;
        this.createUserCollection = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var user, existingUser, createProducts, createCollection, isValid, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        return [4 /*yield*/, req.body];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, model_1.LoginSchema.findOne({ userName: user.userName })];
                    case 2:
                        existingUser = _a.sent();
                        if (!(!existingUser && user.IsRegister)) return [3 /*break*/, 7];
                        return [4 /*yield*/, model_1.ProductsSchema.create({
                                products: []
                            })];
                    case 3:
                        createProducts = _a.sent();
                        if (!createProducts) return [3 /*break*/, 5];
                        return [4 /*yield*/, model_1.LoginSchema.create({
                                userName: user.userName,
                                password: user.password,
                                secretKey: [],
                                productsId: createProducts._id
                            })];
                    case 4:
                        createCollection = _a.sent();
                        if (createCollection) {
                            res.status(200).json({
                                error: false,
                                message: "user registered successfully",
                                body: createCollection
                            });
                        }
                        else {
                            res.status(500).json({
                                error: true,
                                message: "something went wrong while creating user"
                            });
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        res.status(500).json({
                            error: true,
                            message: "something went wrong while creating products"
                        });
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        if (existingUser && user.Islogin) {
                            isValid = existingUser.password === user.password;
                            if (isValid) {
                                res.status(200).json({
                                    error: false,
                                    message: "Login sucessful..",
                                    body: existingUser
                                });
                            }
                            else {
                                res.status(500).json({
                                    error: true,
                                    message: "invalid password"
                                });
                            }
                        }
                        else if (existingUser && user.IsRegister) {
                            res.status(503).json({
                                error: true,
                                message: "User already exists.."
                            });
                        }
                        else {
                            res.status(503).json({
                                error: true,
                                message: 'User does not exist'
                            });
                        }
                        _a.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        }); };
        this.postProduct = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var product, userData, id, existingProducts, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, req.body.products];
                    case 1:
                        product = _a.sent();
                        return [4 /*yield*/, req.body.user];
                    case 2:
                        userData = _a.sent();
                        return [4 /*yield*/, userData.productsId];
                    case 3:
                        id = _a.sent();
                        if (!id) return [3 /*break*/, 5];
                        return [4 /*yield*/, model_1.ProductsSchema.findOneAndUpdate({ _id: id }, {
                                products: product
                            }, {
                                "new": true
                            })];
                    case 4:
                        existingProducts = _a.sent();
                        if (existingProducts) {
                            res.status(200).json({
                                error: false,
                                message: 'products added successfully',
                                body: existingProducts
                            });
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        res.status(500).json({
                            error: true,
                            message: 'id not found'
                        });
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        err_2 = _a.sent();
                        console.log(err_2);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.getAllProducts = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var productId, existingProductsData, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, req.params.id];
                    case 1:
                        productId = _a.sent();
                        if (!productId) return [3 /*break*/, 3];
                        return [4 /*yield*/, model_1.ProductsSchema.findOne({ _id: productId })];
                    case 2:
                        existingProductsData = _a.sent();
                        if (existingProductsData) {
                            res.status(200).json({
                                error: false,
                                message: 'products fetched successfully',
                                body: existingProductsData
                            });
                        }
                        else {
                            res.status(404).json({
                                error: true,
                                message: 'products not available'
                            });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        res.status(404).json({
                            error: true,
                            message: 'product id not available'
                        });
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_3 = _a.sent();
                        console.log(err_3);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.deleteProducts = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var productsId, productItemIndex, products, productItem, updatedProducts, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        productsId = req.params.productsId;
                        productItemIndex = parseInt(req.params.productItemIndex);
                        return [4 /*yield*/, model_1.ProductsSchema.findOne({ _id: productsId })];
                    case 1:
                        products = _a.sent();
                        if (!products) return [3 /*break*/, 5];
                        productItem = products.products.splice(productItemIndex, 1);
                        if (!productItem) return [3 /*break*/, 3];
                        return [4 /*yield*/, model_1.ProductsSchema.findOneAndUpdate({ _id: productsId }, {
                                products: products.products
                            }, { "new": true })];
                    case 2:
                        updatedProducts = _a.sent();
                        if (updatedProducts) {
                            res.status(200).json({
                                error: false,
                                message: "product deleted and updated succesfully",
                                body: productItem
                            });
                        }
                        else {
                            res.status(200).json({
                                error: false,
                                message: "product deleted successfully",
                                body: productItem
                            });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        res.status(404).json({
                            error: true,
                            message: 'could not Delete the Product Item'
                        });
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        res.status(404).json({
                            error: true,
                            message: 'could not find the user products'
                        });
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        err_4 = _a.sent();
                        console.log(err_4);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.editProducts = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var productsId, productItemIndex, needToUpdate, products, productItem, updatedProducts, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        productsId = req.params.productsId;
                        productItemIndex = parseInt(req.params.productItemIndex);
                        needToUpdate = req.body;
                        return [4 /*yield*/, model_1.ProductsSchema.findOne({ _id: productsId })];
                    case 1:
                        products = _a.sent();
                        if (!products) return [3 /*break*/, 5];
                        productItem = products.products.splice(productItemIndex, 1, needToUpdate);
                        if (!productItem) return [3 /*break*/, 3];
                        return [4 /*yield*/, model_1.ProductsSchema.findOneAndUpdate({ _id: productsId }, {
                                products: products.products
                            }, { "new": true })];
                    case 2:
                        updatedProducts = _a.sent();
                        if (updatedProducts) {
                            res.status(200).json({
                                error: false,
                                message: 'products updated successfully',
                                body: updatedProducts
                            });
                        }
                        else {
                            res.status(500).json({
                                error: true,
                                message: 'could not update products'
                            });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        res.status(500).json({
                            error: true,
                            message: 'could not splice the product'
                        });
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        res.status(404).json({
                            error: true,
                            message: 'could not find products'
                        });
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        err_5 = _a.sent();
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.updateLogin = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var secretKey, id, existingUser, updatedUser, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, req.body];
                    case 1:
                        secretKey = _a.sent();
                        id = req.params.id;
                        return [4 /*yield*/, model_1.LoginSchema.findOne({ _id: id })];
                    case 2:
                        existingUser = _a.sent();
                        if (!existingUser) return [3 /*break*/, 4];
                        return [4 /*yield*/, model_1.LoginSchema.findOneAndUpdate({ _id: id }, {
                                secretKey: secretKey
                            }, { "new": true })];
                    case 3:
                        updatedUser = _a.sent();
                        if (updatedUser) {
                            res.status(200).json({
                                error: false,
                                message: 'user updated successfully',
                                body: updatedUser
                            });
                        }
                        else {
                            res.status(503).json({
                                error: true,
                                message: 'could not update User Data'
                            });
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        res.status(503).json({
                            error: true,
                            message: 'User does not exist'
                        });
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_6 = _a.sent();
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.updateProductsId = function (userData, Products) { return __awaiter(_this, void 0, void 0, function () {
            var getUserData, updatedUserData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model_1.LoginSchema.findOne({ _id: userData._id })];
                    case 1:
                        getUserData = _a.sent();
                        if (!!userData.productsId) return [3 /*break*/, 3];
                        return [4 /*yield*/, model_1.LoginSchema.updateOne({ _id: userData._id }, {
                                $set: {
                                    productsId: Products._id
                                }
                            })];
                    case 2:
                        updatedUserData = _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return Controller;
}());
exports.Controller = Controller;
