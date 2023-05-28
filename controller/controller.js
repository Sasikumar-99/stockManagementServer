const {
  LoginSchema,
  ProductsSchema,
  ProductItemSchema,
  chatsArchive,
  chatItemHistory,
  reportsCollections,
  entryCollection
} = require("../model/model");
const moment = require("moment");

const createUserCollection = async (req, res, next) => {
  try {
    const user = await req.body;
    const existingUser = await LoginSchema.findOne({ userName: user.userName });
    if (!existingUser && user.IsRegister) {
      const createProducts = await ProductsSchema.create({
        products: [],
      });
      const AssignChat = await chatsArchive.create({
        chatsArchive: [],
      });
      const createReport = await reportsCollections.create({
        reportsArchive: [],
      });
      const EntryList = await entryCollection.create({
        lists: [],
      });
      if (createProducts && AssignChat && createReport && EntryList) {
        const createCollection = await LoginSchema.create({
          userName: user.userName,
          password: user.password,
          secretKey: [],
          categories: [{ checked: true, name: "others" }],
          productsId: createProducts._id,
          chatId: AssignChat._id,
          reportId: createReport._id,
          entryId:EntryList._id
        });
        if (createCollection) {
          res.status(200).json({
            error: false,
            message: "user registered successfully",
            body: createCollection,
          });
        } else {
          res.status(500).json({
            error: true,
            message: "something went wrong while creating user",
          });
        }
      } else {
        res.status(500).json({
          error: true,
          message:
            "something went wrong while creating products or creating chat",
        });
      }
    } else if (existingUser && user.Islogin) {
      const isValid = existingUser.password === user.password;
      if (isValid) {
        res.status(200).json({
          error: false,
          message: "Login sucessful..",
          body: existingUser,
        });
      } else {
        res.status(500).json({
          error: true,
          message: "invalid password",
        });
      }
    } else if (existingUser && user.IsRegister) {
      res.status(503).json({
        error: true,
        message: "User already exists..",
      });
    } else {
      res.status(503).json({
        error: true,
        message: "User does not exist",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await LoginSchema.find({});
    if (users) {
      res.status(200).json({
        error: false,
        message: "Users fetched",
        body: users,
      });
    } else {
      res.status(404).json({
        error: true,
        message: "Could not fetch Users",
      });
    }
  } catch (err) {}
};

const postProduct = async (req, res, next) => {
  try {
    const product = await req.body.products;
    const userData = await req.body.user;
    const id = await userData.productsId;
    if (id) {
      const existingProducts = await ProductsSchema.findOneAndUpdate(
        { _id: id },
        {
          products: product,
        },
        {
          new: true,
        }
      );
      if (existingProducts) {
        res.status(200).json({
          error: false,
          message: "products added successfully",
          body: existingProducts,
        });
      }
    } else {
      res.status(500).json({
        error: true,
        message: "id not found",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const productId = await req.params.id;
    if (productId) {
      const existingProductsData = await ProductsSchema.findOne({
        _id: productId,
      });
      if (existingProductsData) {
        res.status(200).json({
          error: false,
          message: "products fetched successfully",
          body: existingProductsData,
        });
      } else {
        res.status(404).json({
          error: true,
          message: "products not available",
        });
      }
    } else {
      res.status(404).json({
        error: true,
        message: "product id not available",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteProducts = async (req, res, next) => {
  try {
    const productsId = req.params.productsId;
    const productItemIndex = parseInt(req.params.productItemIndex);
    const products = await ProductsSchema.findOne({ _id: productsId });
    if (products) {
      const productItem = products.products.splice(productItemIndex, 1);
      if (productItem) {
        const updatedProducts = await ProductsSchema.findOneAndUpdate(
          { _id: productsId },
          {
            products: products.products,
          },
          { new: true }
        );
        if (updatedProducts) {
          res.status(200).json({
            error: false,
            message: "product deleted and updated succesfully",
            body: productItem,
          });
        } else {
          res.status(200).json({
            error: false,
            message: "product deleted successfully",
            body: productItem,
          });
        }
      } else {
        res.status(404).json({
          error: true,
          message: "could not Delete the Product Item",
        });
      }
    } else {
      res.status(404).json({
        error: true,
        message: "could not find the user products",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const editProducts = async (req, res, next) => {
  try {
    const productsId = req.params.productsId;
    const productItemIndex = parseInt(req.params.productItemIndex);
    const needToUpdate = req.body;
    const products = await ProductsSchema.findOne({ _id: productsId });
    if (products) {
      const productItem = products.products.splice(
        productItemIndex,
        1,
        needToUpdate
      );
      if (productItem) {
        const updatedProducts = await ProductsSchema.findOneAndUpdate(
          { _id: productsId },
          {
            products: products.products,
          },
          { new: true }
        );
        if (updatedProducts) {
          res.status(200).json({
            error: false,
            message: "products updated successfully",
            body: updatedProducts,
          });
        } else {
          res.status(500).json({
            error: true,
            message: "could not update products",
          });
        }
      } else {
        res.status(500).json({
          error: true,
          message: "could not splice the product",
        });
      }
    } else {
      res.status(404).json({
        error: true,
        message: "could not find products",
      });
    }
  } catch (err) {}
};

const updateLogin = async (req, res, next) => {
  try {
    const secretKey = await req.body;
    const id = req.params.id;
    const existingUser = await LoginSchema.findOne({ _id: id });
    if (existingUser) {
      const updatedUser = await LoginSchema.findOneAndUpdate(
        { _id: id },
        {
          secretKey: secretKey,
        },
        { new: true }
      );
      if (updatedUser) {
        res.status(200).json({
          error: false,
          message: "user updated successfully",
          body: updatedUser,
        });
      } else {
        res.status(503).json({
          error: true,
          message: "could not update User Data",
        });
      }
    } else {
      res.status(503).json({
        error: true,
        message: "User does not exist",
      });
    }
  } catch (err) {}
};
const updateCategories = async (req, res, next) => {
  try {
    const category = await req.body;
    const id = req.params.id;
    const existingUser = await LoginSchema.findOne({ _id: id });
    if (existingUser) {
      const updatedUser = await LoginSchema.findOneAndUpdate(
        { _id: id },
        {
          categories: category,
        },
        { new: true }
      );
      if (updatedUser) {
        res.status(200).json({
          error: false,
          message: "categories updated successfully",
          body: updatedUser,
        });
      } else {
        res.status(503).json({
          error: true,
          message: "could not update categories Data",
        });
      }
    } else {
      res.status(503).json({
        error: true,
        message: "User does not exist",
      });
    }
  } catch (err) {}
};

const getAllReports = async (req, res, next) => {
  try {
    const id = req.params.id;
    const currentUserReports = await reportsCollections.findOne({ _id: id });
    if (currentUserReports) {
      res.status(200).json({
        error: false,
        message: "Existing reports found successfully",
        body: currentUserReports,
      });
    } else {
      res.status(500).json({
        error: true,
        message: "No Existing reports",
      });
    }
  } catch (err) {}
};

const reportGeneration = async (req, res, next) => {
  try {
    const reports = await req.body;
    const id = req.params.id;
    const currentUserReports = await reportsCollections.findOne({ _id: id });
    if (currentUserReports) {
      const updatedReports = await reportsCollections.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            reportsArchive: reports,
          },
        },
        { new: true }
      );
      if (updatedReports) {
        res.status(200).json({
          error: false,
          message: "reports updated successfully",
          body: updatedReports,
        });
      } else {
        res.status(500).json({
          error: true,
          message: "reports not updated created",
        });
      }
    } else {
      res.status(404).json({
        error: true,
        message: "could not fetch currentUserReports",
      });
    }
  } catch (err) {}
};

const entryListSave = async (req,res,next)=>{
  try{
    const entryId = req.params.id;
    const entryCollectionData = req.body;
    const currentUserEntryList = await entryCollection.findOne({ _id: entryId });
    if(currentUserEntryList){
      const currentUserEntryUpdated = await entryCollection.findOneAndUpdate(
        { _id: entryId },
        {
          $set: {
            lists: entryCollectionData,
          },
        },
        { new: true }
      );
      if(currentUserEntryUpdated){  
        res.status(200).json({
          error: false,
          message: "entryList updated successfully",
          body: currentUserEntryUpdated,
        });
      }else{
        res.status(500).json({
          error: true,
          message: "existing Entry Found problem while updating"
        });
      }
    }else{
      res.status(404).json({
        error: true,
        message: "Existing Entry Not Found "
      });
    }
  }catch(err){

  }
}
const getEntryList = async (req,res,next)=>{
  try{
    const entryId = req.params.id;
    if(entryId){
    const currentUserEntryList = await entryCollection.findOne({ _id: entryId });
    if(currentUserEntryList){
      res.status(200).json({
        error: false,
        message: "entryList updated successfully",
        body: currentUserEntryList.lists,
      });
    }else{
      res.status(404).json({
        error: true,
        message: "Existing Entry Not Found"
      });
    }
    }else{
      res.status(404).json({
        error: true,
        message: "Existing Entry ID not found"
      });
    }
  }catch(err){

  }
}
const chatEmitted = async (data) => {
  if (this.inChatUsers) {
    const { chatId } = data.from;
    const loggedUserChatData = await chatsArchive.findOne({ _id: chatId });
    const chattingUserChatData = await chatsArchive.findOne({
      _id: data.to.chatId,
    });
    if (loggedUserChatData && chattingUserChatData) {
      loggedUserChatData.chatsArchive.push(data);
      chattingUserChatData.chatsArchive.push(data);
      const updatedLoggedUserChatData = await chatsArchive.findOneAndUpdate(
        { _id: chatId },
        {
          chatsArchive: loggedUserChatData.chatsArchive,
        },
        { new: true }
      );
      const updatedChattingUserData = await chatsArchive.findByIdAndUpdate(
        { _id: data.to.chatId },
        {
          chatsArchive: chattingUserChatData.chatsArchive,
        },
        { new: true }
      );
      if (updatedLoggedUserChatData && updatedChattingUserData) {
        const response = {
          error: false,
          statusCode: 200,
          message: "users chat found",
          body: {
            updatedLoggedUserChatData: updatedLoggedUserChatData,
            updatedChattingUserData: updatedChattingUserData,
          },
        };
        return response;
      } else {
        const response = {
          error: true,
          statusCode: 500,
          message:
            "could not update updatedLoggedUserChatData OR updatedChattingUserData",
        };
        return response;
      }
    } else {
      const response = {
        error: true,
        statusCode: 404,
        message: "could not find chat Data",
      };
      return response;
    }
  } else {
    const response = {
      error: true,
      statusCode: 400,
      message: "could not get the connected chatting users",
    };
    return response;
  }
};

const inChatUsers = "";

const chattingUsers = async (data) => {
  this.inChatUsers = data;
  return this.inChatUsers;
};

const updateProductsId = async (userData, Products) => {
  const getUserData = await LoginSchema.findOne({ _id: userData._id });
  if (!userData.productsId) {
    const updatedUserData = await LoginSchema.updateOne(
      { _id: userData._id },
      {
        $set: {
          productsId: Products._id,
        },
      }
    );
  }
};
module.exports = {
  updateCategories,
  createUserCollection,
  postProduct,
  getAllProducts,
  deleteProducts,
  editProducts,
  updateLogin,
  updateProductsId,
  chattingUsers,
  chatEmitted,
  getAllUsers,
  reportGeneration,
  getAllReports,
  entryListSave,
  getEntryList
};
