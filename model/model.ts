import Mongoose from "mongoose";

const mongoose = Mongoose;
const Schema = mongoose.Schema
const loginSchema = new Schema({
  userName : {
    type : String
  },
  password :{
    type : String
  },
  secretKey : [],
  productsId : {
    type : String
  },
})

const productSchema = new Schema({
  productName : {
    type : String
  },
  sellingPrice : {
    type : String
  },
  receivedPrice : {
    type : String
  },
  quantity : {
    type : Number
  }
})

const productsArray = new Schema({
  products : [
    productSchema
  ]
})
export const LoginSchema = mongoose.model('Users',loginSchema);
export const ProductsSchema = mongoose.model('Products',productsArray)
export const ProductItemSchema = mongoose.model('ProducyItemSchema',productSchema)
