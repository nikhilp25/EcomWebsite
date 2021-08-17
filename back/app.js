
const express=require("express");
// const jwt=require("jsonwebtoken");
// const userModel = require("./Model/user");
const buildRouter=require("./Router/buildRouter");
const userRouter=require("./Router/userRouter");
const viewRouter=require("./Router/viewRouter");
const bookingRouter=require("./Router/bookingRouter");
const app=express();
const path=require("path");
const cookieParser=require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.use(express.static("public"));



// app.use(function(req,res,next){

//     console.log("I am called before");
//     console.log(req.body);

//     next();
// })


// app.use(function(req,res,next){
    
//     console.log("I am called after");
//     console.log(req.body);
// })


// app.post("/tokenCreator",async function(req,res){

//               try{
                            
//                             const token=jwt.sign({id:"123123"},"asfdsdfvgbhj");
//                             console.log(token);
//                             res.json({
//                                           token
//                             })
//               }
//               catch(error){
//                             res.json({
//                                           message:"Failed to create token"
//                             })
//               }
              
// })


// app.post("/tokenVerify",function(req,res){
//               const{token}=req.body;
//               console.log(token);
//               const payload=jwt.verify(token,"asfdsdfvgbhj");
//               console.log(payload);
// })

app.set("view engine","pug");
app.set("views",path.join(__dirname,"View"));



app.use("/api/booking",bookingRouter)

//methods for user file
app.use("/api/build",buildRouter);
app.use("/api/user",userRouter);
app.use("/",viewRouter);

// ######################Builds######################
// methods for build file



app.listen(3000, function(){
              console.log("Server running at 3000");
})
