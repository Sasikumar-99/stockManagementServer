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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const model_1 = require("../model/model");
class Controller {
    constructor() {
        this.createUserCollection = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield req.body;
                const existingUser = yield model_1.LoginSchema.findOne({ userName: user.userName });
                if (!existingUser && user.IsRegister) {
                    const createProducts = yield model_1.ProductsSchema.create({
                        products: []
                    });
                    if (createProducts) {
                        const createCollection = yield model_1.LoginSchema.create({
                            userName: user.userName,
                            password: user.password,
                            secretKey: [],
                            productsId: createProducts._id
                        });
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
                                message: "something went wrong while creating user",
                            });
                        }
                    }
                    else {
                        res.status(500).json({
                            error: true,
                            message: "something went wrong while creating products",
                        });
                    }
                }
                else if (existingUser && user.Islogin) {
                    const isValid = existingUser.password === user.password;
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
                            message: "invalid password",
                        });
                    }
                }
                else if (existingUser && user.IsRegister) {
                    res.status(503).json({
                        error: true,
                        message: "User already exists..",
                    });
                }
                else {
                    res.status(503).json({
                        error: true,
                        message: 'User does not exist'
                    });
                }
            }
            catch (err) {
                console.log(err);
            }
        });
        this.postProduct = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield req.body.products;
                const userData = yield req.body.user;
                const id = yield userData.productsId;
                if (id) {
                    const existingProducts = yield model_1.ProductsSchema.findOneAndUpdate({ _id: id }, {
                        products: product
                    }, {
                        new: true
                    });
                    if (existingProducts) {
                        res.status(200).json({
                            error: false,
                            message: 'products added successfully',
                            body: existingProducts
                        });
                    }
                }
                else {
                    res.status(500).json({
                        error: true,
                        message: 'id not found'
                    });
                }
            }
            catch (err) {
                console.log(err);
            }
        });
        this.getAllProducts = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = yield req.params.id;
                if (productId) {
                    const existingProductsData = yield model_1.ProductsSchema.findOne({ _id: productId });
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
                            message: 'products not available',
                        });
                    }
                }
                else {
                    res.status(404).json({
                        error: true,
                        message: 'product id not available',
                    });
                }
            }
            catch (err) {
                console.log(err);
            }
        });
        this.deleteProducts = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const productsId = req.params.productsId;
                const productItemIndex = parseInt(req.params.productItemIndex);
                const products = yield model_1.ProductsSchema.findOne({ _id: productsId });
                if (products) {
                    const productItem = products.products.splice(productItemIndex, 1);
                    if (productItem) {
                        const updatedProducts = yield model_1.ProductsSchema.findOneAndUpdate({ _id: productsId }, {
                            products: products.products
                        }, { new: true });
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
                    }
                    else {
                        res.status(404).json({
                            error: true,
                            message: 'could not Delete the Product Item'
                        });
                    }
                }
                else {
                    res.status(404).json({
                        error: true,
                        message: 'could not find the user products'
                    });
                }
            }
            catch (err) {
                console.log(err);
            }
        });
        this.editProducts = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const productsId = req.params.productsId;
                const productItemIndex = parseInt(req.params.productItemIndex);
                const needToUpdate = req.body;
                const products = yield model_1.ProductsSchema.findOne({ _id: productsId });
                if (products) {
                    const productItem = products.products.splice(productItemIndex, 1, needToUpdate);
                    if (productItem) {
                        const updatedProducts = yield model_1.ProductsSchema.findOneAndUpdate({ _id: productsId }, {
                            products: products.products
                        }, { new: true });
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
                    }
                    else {
                        res.status(500).json({
                            error: true,
                            message: 'could not splice the product'
                        });
                    }
                }
                else {
                    res.status(404).json({
                        error: true,
                        message: 'could not find products'
                    });
                }
            }
            catch (err) {
            }
        });
        this.updateLogin = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const secretKey = yield req.body;
                const id = req.params.id;
                const existingUser = yield model_1.LoginSchema.findOne({ _id: id });
                if (existingUser) {
                    const updatedUser = yield model_1.LoginSchema.findOneAndUpdate({ _id: id }, {
                        secretKey: secretKey
                    }, { new: true });
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
                }
                else {
                    res.status(503).json({
                        error: true,
                        message: 'User does not exist'
                    });
                }
            }
            catch (err) {
            }
        });
        this.updateProductsId = (userData, Products) => __awaiter(this, void 0, void 0, function* () {
            const getUserData = yield model_1.LoginSchema.findOne({ _id: userData._id });
            if (!userData.productsId) {
                const updatedUserData = yield model_1.LoginSchema.updateOne({ _id: userData._id }, {
                    $set: {
                        productsId: Products._id
                    }
                });
            }
        });
    }
}
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map