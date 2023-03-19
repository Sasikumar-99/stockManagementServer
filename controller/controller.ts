import { LoginSchema,ProductsSchema,ProductItemSchema } from "../model/model"

export class Controller{
  public createUserCollection = async(req:any,res:any,next:any)=>{
    try{
        const user = await req.body
        const existingUser = await LoginSchema.findOne({userName:user.userName})
        if(!existingUser && user.IsRegister){
          const createProducts = await ProductsSchema.create({
            products:[]
          })
          if(createProducts){
            const createCollection = await LoginSchema.create({
              userName:user.userName,
              password:user.password,
              secretKey:[],
              productsId:createProducts._id
            })
            if(createCollection){
              res.status(200).json({
                error : false,
                message : "user registered successfully",
                body :createCollection
              })
            }else{
              res.status(500).json({
                error : true,
                message : "something went wrong while creating user",
              })
            }
          }else{
            res.status(500).json({
              error : true,
              message : "something went wrong while creating products",
            })
          }
        }else if(existingUser && user.Islogin){
          const isValid =  existingUser.password  === user.password
          if(isValid){
            res.status(200).json({
              error : false,
              message : "Login sucessful..",
              body :existingUser
            })
          }else{
            res.status(500).json({
              error : true,
              message : "invalid password",
            })
          }
        }else if(existingUser && user.IsRegister){
          res.status(503).json({
            error : true,
            message : "User already exists..",
          })
        }else{
          res.status(503).json({
            error:true,
            message : 'User does not exist'
          })
        }
    }catch(err){
      console.log(err);
    }
  }

 postProduct = async(req:any,res:any,next:any)=>{
  try{
    const product = await req.body.products;
    const userData = await req.body.user;
    const id = await userData.productsId;
    if(id){
    const existingProducts = await ProductsSchema.findOneAndUpdate({_id : id },{
      products : product
    },{
      new : true
    });
      if(existingProducts){
        res.status(200).json({
          error:false,
          message:'products added successfully',
          body : existingProducts
        })
      }
    }else {
        res.status(500).json({
          error: true,
          message : 'id not found'
        })
    }
  }catch(err){
   console.log(err)
  }
  }

 getAllProducts = async(req:any,res:any,next:any)=>{
    try{
      const productId = await req.params.id
      if(productId){
        const existingProductsData = await ProductsSchema.findOne({_id:productId})
        if(existingProductsData){
          res.status(200).json({
            error:false,
            message:'products fetched successfully',
            body:existingProductsData
          })
        }else{
          res.status(404).json({
            error:true,
            message:'products not available',
          })
        }
      } else{
        res.status(404).json({
          error:true,
          message:'product id not available',
        })
      }
    }catch(err){
      console.log(err);
    }
  }

 deleteProducts = async(req:any,res:any,next:any)=> {
    try{
      const productsId = req.params.productsId;
      const productItemIndex =parseInt(req.params.productItemIndex);
      const products = await ProductsSchema.findOne({_id:productsId})
      if(products){
      const productItem = products.products.splice(productItemIndex,1)
      if(productItem){
        const updatedProducts = await ProductsSchema.findOneAndUpdate({_id:productsId},{
          products:products.products
        },{new:true})
        if(updatedProducts){
          res.status(200).json({
            error:false,
            message:"product deleted and updated succesfully",
            body:productItem
          })
        }else{
          res.status(200).json({
            error:false,
            message:"product deleted successfully",
            body:productItem
          })
        }
      }else{
        res.status(404).json({
          error:true,
          message:'could not Delete the Product Item'
        })
      }
      }else{
        res.status(404).json({
          error:true,
          message:'could not find the user products'
        })
      }
    }catch(err){
      console.log(err);
    }
  }

 editProducts = async(req:any,res:any,next:any)=>{
    try{
      const productsId = req.params.productsId;
      const productItemIndex =parseInt(req.params.productItemIndex);
      const needToUpdate = req.body;
      const products = await ProductsSchema.findOne({_id:productsId})
      if(products){
        const productItem = products.products.splice(productItemIndex,1,needToUpdate)
        if(productItem){
          const updatedProducts = await ProductsSchema.findOneAndUpdate({_id:productsId},{
            products:products.products
          },{new:true})
          if(updatedProducts){
            res.status(200).json({
              error:false,
              message:'products updated successfully',
              body:updatedProducts
            })
          }else{
            res.status(500).json({
              error:true,
              message:'could not update products'
            })
          }
        }else{
          res.status(500).json({
            error:true,
            message:'could not splice the product'
          })
        }
      }else{
        res.status(404).json({
          error:true,
          message:'could not find products'
        })
      }
    }catch(err){

    }
  }

 updateLogin = async(req:any,res:any,next:any)=>{
  try{
    const secretKey = await req.body;
    const id = req.params.id;
    const existingUser = await LoginSchema.findOne({_id:id})
    if(existingUser){
    const updatedUser = await LoginSchema.findOneAndUpdate({_id:id},{
      secretKey:secretKey
    },{new:true})
    if(updatedUser){
      res.status(200).json({
        error:false,
        message:'user updated successfully',
        body:updatedUser
      })
    }else{
      res.status(503).json({
        error:true,
        message : 'could not update User Data'
      })
    }
    }else{
      res.status(503).json({
        error:true,
        message : 'User does not exist'
      })
    }
  }catch(err){

  }
  }

  updateProductsId = async(userData:any,Products:any)=>{
    const getUserData = await LoginSchema.findOne({_id:userData._id});
      if(!userData.productsId){
        const updatedUserData = await LoginSchema.updateOne({_id : userData._id},{
          $set : {
            productsId : Products._id
          }
        },)
      }
  }
}
