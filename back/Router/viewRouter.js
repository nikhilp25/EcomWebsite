const express=require("express");
const { isLoggedIn,logout } = require("../Controller/authController");
const {  getHomePage,getLoginPage,getSignUpPage,getProductPage,getResetPasswordPage,getProfilePage}=require("../Controller/viewController");

const viewRouter= express.Router();


viewRouter.use(isLoggedIn);
viewRouter.route("").get(getHomePage);
// viewRouter.route("/home").get(getHomePage);
viewRouter.route("/login").get(getLoginPage);
viewRouter.route("/logout").get(logout);
viewRouter.route("/resetpassword/:token").get(getResetPasswordPage);
viewRouter.route("/signup").get(getSignUpPage);
viewRouter.route("/products").get(getProductPage);
viewRouter.route("/profilePage").get(getProfilePage);

module.exports=viewRouter;