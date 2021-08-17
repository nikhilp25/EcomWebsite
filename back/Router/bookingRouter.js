const express=require("express");

const { createPaymentSession } = require("../Controller/bookingController");
const { protectRoute }=require("../Controller/authController");
const bookingRouter=express.Router();


bookingRouter.post("/createPaymentSession",protectRoute,createPaymentSession);

module.exports=bookingRouter;