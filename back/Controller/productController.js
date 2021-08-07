// const builds=require("../Model/build.json");
// const {v4:uuidv4}=require("uuid");
// let fs=require("fs");

const productModel=require("../Model/product");



async function CreateBuild(req,res){
                        
              
              try{
                            let sentbuild=req.body;
                            let build=await productModel.create(sentbuild);
                            res.status(200).json({
                                          message:"Plan Create Successfully",
                                          data:build
                            })

              }
              catch(error){

                            res.status(501).json({
                                          message:"Failed to create a plan",
                                          error:error.errors.discount.message
                            })
              }


              // productModel.create(build).then( build=>{

              //               res.status(200).json({
              //                             message:"Product created Successfully",
              //                             data:build
              //               })
              // })
              // .catch(error=>{
              // })
              
          }
async function AllBuild(req,res){


            try{
                let product=await productModel.find({});
                res.status(200).json({
                    message:"Got all product succefully !!",
                    data:product
                })
            }
            catch(error){

                res.status(501).json({
                    message:"No product found",
                })
                    
            }
        }

        //       if(builds.length){
        //         res.status(200).json({
        //                       message:"All plans",
        //                       data:builds
        //         })
        //       }
        //       else
        //       {
        //       })
        //       }
        //   }
async function getBuildById(req,res){

                try{
                    let {id}=req.params;
                    let product=await productModel.findById(id);
                    res.status(200).json({
                                  message:"Succesfully get product by id",
                                  data:product,
                    });          

                }
                catch(error){

                    res.status(404).json({
                                  message:"Id not found",
                                  error:error.message

                    });        
                }
            }

        //       let filteredPlans=builds.filter(function(build){
        //                     return build.id==id;
        //       })
        //       if(filteredPlans.length)
        //       {
        //       }
        //       else
        //       {
        //       }
        //   }
    async function updateBuildById(req,res){

            try{
                let id=req.params.id || req.id;
                let {updateObj}=req.body;
                let product=await productModel.findById(id);
                // console.log(product);

                for(key in updateObj)
                {
                    product[key]=updateObj[key];
                }

                let updatedProduct=await product.save();
                // console.log(updatedProduct);
                // let updatedProduct=await productModel.findByIdAndUpdate(id,updateObj,{new:true});
                res.status(200).json({
                    message:"Product updated successfully !!",
                    data:updatedProduct,
                });

            }
            catch(error){
                // console.log(error);
                res.status(501).json({
                    message:"Product not found",
                    error:error.message
                });              
            }
        }
async function deleteBuildById(req,res){
            try{
        
                    let {id} =req.params;
                    let deletedProduct=await productModel.findByIdAndDelete(id);
                    res.status(200).json({
                        message:"Product Deleted !!",
                        data:deletedProduct
                    })
                }
              catch(error)
              {
                    res.status(501).json({
                        message:"Product Not found !!",
                        error
                    })
              }
          
          }

          
        //       let filteredPlans=builds.filter(function(build){
        //           return build.id==id;
        //       })
        //       if(filteredPlans.length)
        //       {
        //           let build=filteredPlans[0];
        //           for(key in updateObj)
        //           {
        //               build[key]=updateObj[key];
        //           }
        //           fs.writeFileSync("./Model/build.json",JSON.stringify(builds));
        //           res.status(200).json({
        //               message:"Plan has been updated",           
        //   })
        //       }
        //       else{
        //   }) 
        //       }
        //   }

module.exports.CreateBuild=CreateBuild;
module.exports.AllBuild=AllBuild;
module.exports.getBuildById=getBuildById;
module.exports.updateBuildById=updateBuildById;
module.exports.deleteBuildById=deleteBuildById;