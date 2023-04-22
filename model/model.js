const mongoose =require('mongoose');
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
  chatId : {
    type:String
}
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

const chatsSchema =new Schema({
  userName : {
    type : String
  },
  chats :[]
})

const fromSchema = new Schema({
  from : {
    type : String
  },
  fromTime :{
    type : String
  }
})

const toSchema = new Schema({
  to : {
    type : String
  },
  toTime : {
    type : String
  }
})

const chatHistory = new Schema({
      from : loginSchema,
      to : loginSchema,
      message:{
        type : String
      },
      time:{
        type : String
      }
})

const chatCollection = new Schema({
  chatsArchive : [chatHistory]
})

 const LoginSchema = mongoose.model('Users',loginSchema);
 const ProductsSchema = mongoose.model('Products',productsArray)
 const ProductItemSchema = mongoose.model('ProductItemSchema',productSchema)
 const chatsArchive = mongoose.model('chatsArchive',chatCollection)
 const chatItem = mongoose.model('chatItem',chatsSchema)
 const chatItemHistory = mongoose.model('chatItemHistory',chatHistory)

 module.exports = {LoginSchema,ProductsSchema,ProductItemSchema,chatsArchive,chatItem,chatItemHistory}