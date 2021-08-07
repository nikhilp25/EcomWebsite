const express=require("express");
const userRouter=express.Router();

const {signup,login,protectRoute,forgetPassword,resetPassword}=require("../Controller/authController");

const {
              // getAllUser,
              // createUser,
              getUserById,
              deleteUserById,
              updateUserById,
}=require("../Controller/userController");

userRouter.post("/signup",signup);
userRouter.post("/login",login);
userRouter.post("/forgetpassword",forgetPassword);
userRouter.patch("/resetpassword/:token",resetPassword);

// userRouter
// .route("")
// .get(getAllUser)
// .post(createUser);

userRouter.route("")
.get(protectRoute,getUserById)
.delete(protectRoute,deleteUserById)
.patch(protectRoute,updateUserById);


module.exports=userRouter;