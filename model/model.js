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
  categories:[],
  chatRoom:[],
  productsId : {
    type : String
  },
  chatId : {
    type:String
},
  reportId:{
  type:String
},
  entryId:{
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
  },
  category : {
    type : String
  }
})

const productsArray = new Schema({
  products : [
    productSchema
  ]
})

const soldData = new Schema({
  category:{
    type:String
  },
  productName:{
    type:String
  },
  soldCount:{
    type:Number
  },
  receivedPrice:{
    type:Number
  },
  soldPrice:{
    type:Number
  },
  profit:{
    type:Number
  }
})

const entry = new Schema({
  serialNo:{
    type:Number
  },
  date:{
    type:String
  },
  Model:{
    type:String
  },
  customerName:{
    type:String
  },
  description:{
    type:String
  },
  contactNo:{
    type:String
  },
  status:{
    type:String
  },
  price:{
    type:String
  }
})

const chatUser = new Schema({
  Id:{
    type: String
  },
  chatId: {
    type: String
  },
  ref: {
    type: String
  },
})

const messageSchema = new Schema({
  from: {
    type: chatUser
  },
  to: {
    type: chatUser
  },
  messageBody: {
    type: String
  },
  messageType: {
    type: String
  },
  read: {
    type: Boolean
  },
  createdAt: {
    type: String
  }
})

const chatsArchive = new Schema({
    chatsArchive:{type:Map, of:[messageSchema]}
});

const entryList = new Schema({
  lists : []
})
const reports = new Schema({
  date : {
    type:String
  },
  soldData : []
})

const reportsCollection = new Schema({
  reportsArchive: [reports]
})

 const LoginSchema = mongoose.model('Users',loginSchema);
 const ProductsSchema = mongoose.model('Products',productsArray)
 const ProductItemSchema = mongoose.model('ProductItemSchema',productSchema)
 const reportsCollections = mongoose.model('reportsCollection',reportsCollection)
 const entryCollection = mongoose.model('entryCollection',entryList)
 const chatSchema = mongoose.model('chatArchive', chatsArchive);
 module.exports = {reportsCollections,LoginSchema,ProductsSchema,ProductItemSchema,entryCollection,chatSchema}