import Express from 'express'
import Mongoose from 'mongoose'
import BodyParser  from 'body-parser'
import Cors from 'cors'
import { Controller } from './controller/controller'
import {environment} from './environment'


const express = Express()
const mongoose = Mongoose;
const bodyParser = BodyParser;
const cors = Cors


export const init = async()=>{
  const allowedOrigins = /^https?:\/\/\w+(\.\w+)*(:[0-9]+)?(\/.*)?$/;
  express.use(cors({
    origin:allowedOrigins
  }));
  express.use(bodyParser.urlencoded({ extended: false }))
  express.use(bodyParser.json())
  mongoose.set('strictQuery',true);
  dbConnect();
}

init();

async function dbConnect(){
  try{
    const url = environment.mongoDBUrl ? environment.mongoDBUrl : 'mongodb+srv://sasi358459:Sasi358459@cluster0.h2vvopf.mongodb.net/?'
    const dbConnect = await mongoose.connect(url,{})
    if(dbConnect){
      console.log('mongo connected');
      setRoutes();
      hostServer();
    }
  }catch(err){
    console.log(err);
  }
}

function setRoutes(){
  const controller = new Controller()

  express.get('/',(req:any,res:any)=>{
    res.send('hello')
  })
  express.get('getAllUser',);
  express.get('/getAllProducts/:id',controller.getAllProducts);

  express.post('/login',controller.createUserCollection);
  express.put('/updateUser/:id',controller.updateLogin)
  express.post('/products',controller.postProduct);
  express.put('/editProducts/:productsId/:productItemIndex',controller.editProducts)
  express.delete('/deleteProducts/:productsId/:productItemIndex',controller.deleteProducts)
}

async function hostServer(){
  const port = environment.PORT ? environment.PORT : 3000
  const server = await express.listen(port)
  if(server){
    console.log(`server started at ${port}`);
  }
}

