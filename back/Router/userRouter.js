const express=require("express");
const userRouter=express.Router();
const multer=require("multer");

const storage=multer.diskStorage({
              destination:function(req,file,cb){
                            cb(null,"public/img/user")
              },
              filename:function(req,file,cb){
                            cb(null,`user${Date.now()}.jpg`);
              }
})
function fileFilter(req,file,cb){
              if(file.mimetype.includes("image")){
                            cb(null,true);
              }
              else{
                            cb(null,false);
              }
}


const upload=multer({storage:storage,fileFilter:fileFilter});
const {signup,login,protectRoute,forgetPassword,resetPassword}=require("../Controller/authController");

const {
              // getAllUser,
              // createUser,
              getUserById,
              deleteUserById,
              updateUserById,
              updateProfilePhoto
}=require("../Controller/userController");
const { getProfilePage } = require("../Controller/viewController");

userRouter.post("/signup",signup);
userRouter.post("/login",login);
userRouter.post("/forgetpassword",forgetPassword);
userRouter.patch("/resetpassword/:token",resetPassword);

// userRouter
// .route("")
// .get(getAllUser)
// .post(createUser);
userRouter.use(protectRoute);
userRouter.patch("/updateProfilePhoto",upload.single("user"),updateProfilePhoto);


userRouter.route("")
.get(protectRoute,getUserById)
.delete(protectRoute,deleteUserById)
.patch(protectRoute,updateUserById);


module.exports=userRouter;