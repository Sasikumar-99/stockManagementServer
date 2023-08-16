const { Server } = require("socket.io");
const {environment} = require('./environment');
const path = require('path');
const {getAllReports,reportGeneration,updateCategories,chatSave,createUserCollection,
  postProduct,getAllProducts,deleteProducts,editProducts,updateLogin,getAllUsers,entryListSave,getEntryList,
  getRecentChat,getParticularUserMessages} = require('./controller/controller.js');
const app = require('express')
const express = app();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const { MongoClient } = require("mongodb");
const hostingServer =http.createServer(express);
const io = new Server(hostingServer,{
  cors: {
    origin: '*',
  }
});

const init = async () => {
  express.use(
    cors({
      origin: '*',
    })
  );
  express.use(app.static('Frontend/buildFiles'))
  express.use(bodyParser.urlencoded({ extended: false }));
  express.use(bodyParser.json());
  mongoose.set("strictQuery", true);
  dbConnect();
};

async function dbConnect() {
  try {
    const url = environment.mongoDBUrl
      ? environment.mongoDBUrl
      : "mongodb+srv://sasi358459:Sasi358459@cluster0.h2vvopf.mongodb.net/?";
    const dbConnect = await mongoose.connect(url, {});
    if (dbConnect) {
      console.log("mongo connected");
      setRoutes();
      await hostServer();
    }
  } catch (err) {
    console.log(err);
  }
}
function setRoutes() {
  express.get("/getAllUser",getAllUsers);
  express.get("/getAllReports/:id",getAllReports);
  express.get("/getAllProducts/:id",getAllProducts);
  express.post("/login", createUserCollection);
  express.put("/updateUser/:id", updateLogin);
  express.post("/products", postProduct);
  express.put(
    "/editProducts/:productsId/:productItemIndex",
    editProducts
  );
  express.delete(
    "/deleteProducts/:productsId/:productItemIndex",
    deleteProducts
  );
  express.put('/updateCategories/:id',updateCategories)
  express.post('/reports/:id',reportGeneration)
  express.post('/entryList/:id',entryListSave)
  express.get('/getEntryList/:id',getEntryList)
}

async function hostServer() {
  const port = environment.PORT ? environment.PORT : 3000;
  hostingServer.listen(port, () => {
    console.log(`server started at ${port}`);
  });
  await socketConnection();
}

async function socketConnection() {
  io.on("connection", (socket) => {
    console.log("user is connected");

    socket.on('message',(data)=>{
      chatSave(data).then(message => {
        console.log(message);
      });
    })
    
    socket.on('recentChats',(user) => {
      getRecentChat(user).then(recentChatDetails => {
        socket.emit('recentChatDetails',recentChatDetails);
      })
    })

    socket.on('getParticularUserMessages', (userDetails) => {
      getParticularUserMessages(userDetails).then(userMessages => {
        socket.emit('fetchedUserMessages',userMessages)
      })
    })
  });
  
}
init();