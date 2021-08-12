// const users=require("../Model/user.json");
// const {v4:uuidv4}=require("uuid");
// let fs=require("fs");

const userModel=require("../Model/user");




async function createUser(req,res){
    
    try{
        let sentuser=req.body;
        let user=await userModel.create(sentuser);
        res.status(200).json({
            message:"User has been created",
            data:user
        })
    }
    catch(error){

        res.status(501).json({
            message:"Failed to create new user",
            error
        })


    }
}
    
//     res.status(201).json({
//         message:"Successfully create a user !",
//         data:user
//     })
// }





async function getAllUser(req,res){

            try{
                let user= await userModel.find({});
                res.status(200).json({
                    message:"Got all the user !!",
                    data:user
                })

            }
            catch(error){
                res.status(501).json({
                    message:"No user found",
                })

            }
        }




        //       if(users.length)
        //       {
        //           res.status(200).json({
        //               message:"All user",
        //               data:users
        //           })
        //       }
        //       else
        //       {
        //           res.status(404).json({
        //               message:"No user found",
        //           })
        //       }
        //   }

async function getUserById(req,res){

            try{
                let id=req.id;
                let user=await userModel.findById(id);
                console.log(user);
                res.status(201).json({
                    message:"User found by id",
                    data:user
                })
                
            }
            catch(error){
                   res.status(501).json({
                       message:"User not found !!",
                       error
                   }) 
            }
        }


        //       let filteredUsers=users.filter(function(user){
        //           return user.id==id;
        //       })
        //       if(filteredUsers.length)
        //       {
        //           res.status(200).json({
        //               message:"Successfully got user by id",
        //               data:filteredUsers[0]
        //           })
        //       }
        //       else{
        //           res.status(404).json({
        //               message:"Id not found",
        //           })
        //       }
        //   }
    async function updateUserById(req,res){
            try{
                let id=req.id;
                let updatedObj=req.body.updatedObj;
                let user=await userModel.findById(id);
                for(key in updatedObj)
                {
                    user[key]=updatedObj[key];
                }
                let updatedUser=await user.save();

                
                // let updatedUser=await userModel.findByIdAndUpdate(id,updatedObj,{new:true});
                res.status(200).json({
                    message:"User has been updated",
                    data:updatedUser
                })
            }
            catch(error){
                res.status(501).json({
                    message:"User not found",
                    error                       
                })
            }

        }


        //     let updateObj=req.body;
        
        //     let filteredUsers=users.filter(function(user){
        //         return user.id==id;
        //     })
        //     if(filteredUsers.length)
        //     {
        //         let user=filteredUsers[0];
        //         for(key in updateObj)
        //         {
        //             user[key]=updateObj[key];
        //         }
        //         fs.writeFileSync("./Model/user.json",JSON.stringify(users));
        //         res.status(200).json({
        //             message:"User has been updated",
        //         })
        //     }
        //     else
        //     {
        //         res.status(404).json({
        //             message:"User not found",
        //         })
        //     }
        // }
async function deleteUserById(req,res){

            try{
                let id=req.id;
                let deleteUser=await userModel.findByIdAndDelete(id);
                if(deleteUser){

                    res.status(200).json({
                        message:"User deleted succesfully !!",
                        data:deleteUser
                    })
                }
                else
                {
                    res.status(200).json({
                        message:"user not found",
                        
                    })
                }

            }
            catch(error){
                res.status(501).json({
                    message:"Failed to delete",
                    error
                })
            }
        }


        //       let filteredUsers=users.filter(function(user){
        //               return user.id!=id;
        //       });
          
        //       if(filteredUsers.length==users.length)
        //       {
        //           res.status(404).json({
        //               message:"User not found!",
        //               data:users
        //           })
        //       }
        //       else{
        //           fs.writeFileSync("./Model/user.json",JSON.stringify(filteredUsers));
        //           res.status(200).json({
        //               message:"Plan deleted successfully",
        //               data:users
        //           })
        //       }
          
        //   }
 async function updateProfilePhoto(req,res){
                try{
                    let file=req.file;
                    console.log(file);
                    let imagePath=file.destination+"/"+filename;
                    console.log(imagePath);
                    imagePath=imagePath.substring(7);
                    let id=req.id;
                    let user=await userModel.findById(id);
                    user.pImage=imagePath;
                    await user.save({validateBeforeSave:false});
                    
                    res.json({
                        message:"Profile Photo updated !!"
                    })
                }
                catch(error){
                    res.status(200).json({
                        message:"Failed to update photo !!",
                        error
                    })
                }
 }

module.exports.getAllUser=getAllUser;
module.exports.createUser=createUser;
module.exports.getUserById=getUserById;
module.exports.deleteUserById=deleteUserById;
module.exports.updateUserById=updateUserById;
module.exports.updateProfilePhoto=updateProfilePhoto;