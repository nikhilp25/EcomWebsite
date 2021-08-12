const userModel = require("../Model/user");
const jwt=require("jsonwebtoken");
const { SECRET_KEY, GMAIL_ID, GMAIL_PW } = require("../secrets/secrets");
const nodemailer=require("nodemailer");

async function sendEmail(message){
              try{
                            var transporter = nodemailer.createTransport({
                                          service:"gmail",  
                                          host: "smtp.gmail.com",
                                          secure:true,
                                          auth: {
                                            user: GMAIL_ID,
                                            pass: GMAIL_PW
                                          }
                                        });
                            let res=await transporter.sendMail({
                                          from: message.from, // sender address
                                          to: message.to, // list of receivers
                                          subject: message.subject, // Subject line
                                          text: message.text, // plain text body
                                          // html: "<b>Hello world?</b>", // html body
                                        });
                                    return res;
              }
              catch(error){
                            return error;
              }
}




async function signup(req,res){

              try{
                            let user=req.body;
                            let newUser=await userModel.create({
                                          name:user.name,
                                          email:user.email,
                                          password:user.password,
                                          confirmPassword:user.confirmPassword,
                                          role:user.role
                            })
                            console.log(newUser);
                            res.status(201).json({
                                          message:"Succesfully Signed up !!",
                                          data:newUser
                            })
              }
              catch(error){
                            res.status(501).json({
                                          message:"Failed to sign up !!",
                                          error:error.message
                            })                            

              }


}

async function login(req,res){
              try{
                            let{email,password}=req.body;
                            // console.log(email,password);
                            let loggedInUser=await userModel.find({email:email});
                            if(loggedInUser.length)
                            {
                                          let user=loggedInUser[0];
                                          if(user.password==password)
                                          {
                                                const token=jwt.sign({id:user["_id"]},SECRET_KEY);
                                                res.cookie('jwt',token,{httpOnly:true});
                                                        res.status(200).json({
                                                                      message:"Logged In successfully !!",
                                                                      data:loggedInUser[0],
                                                                //       token
                                                        })
                                          }
                                          else
                                          {
                                                        res.status(501).json({
                                                                      message:"Creds didn't match",
                                                        })
                                          }
                            }
                            else
                            {
                                          res.status(501).json({
                                                        message:"No user found Sign up First",
                                          })
                            }
              
              }
              catch(error)
              {
                            res.status(501).json({
                                          message:"Login Failed !!"
                            })
              }

}
async function logout(req,res){
      try{
            res.clearCookie("jwt");
            res.redirect("/");
      }
      catch(error)
      {
            res.status(501).json({
                  error
            })
      }
}

async function isLoggedIn(req,res,next){
      try{
            let token = req.cookies.jwt;
            const payload=jwt.verify(token,SECRET_KEY);
            if(payload)
            {
                  let user= await userModel.findById(payload.id);
                  req.name=user.name;
                  req.user=user;
                  next();

            }
            else
            {
                  next();
            }
      }
      catch(error)
      {
            // res.json(200).json({
            //       error
            // })
            next();
      }
}

async function protectRoute(req,res,next)
{
              try{
                    //     const token=req.headers.authorization.split(" ").pop();
                    //     // console.log(token);
                    //     // const {token}=req.body;
                    const token=req.cookies.jwt;
                            console.log("Inside protect");
                        //     // console.log(token);
                            const payload=jwt.verify(token,SECRET_KEY);
                            console.log(payload);
                            if(payload)
                            {
                                          req.id=payload.id;
                                          next();
                            }
                            else
                            {
                                          res.status(501).json({
                                                        message:"Please Login"
                                          })

                            }

              }
              catch(error){
                            
                            res.status(501).json({
                                          message:"Please Login",
                                          error
                            })
              }

}

async function isAuthorized(req,res,next){
              try{
                            let id=req.id;
                            let user=await userModel.findById(id);
                            if(user.role=="admin")
                            {
                                          next();
                            }
                            else
                            {
                                          res.status(200).json({
                                                        message:"You don't have proper right !!"
                                          })

                            }
              }
              catch(error){
                            res.status(501).json({
                                          message:"Failed to authorize user !!",
                                          error
                            })
              }
}

async function forgetPassword(req,res){
              try{
                            let {email}=req.body;
                            console.log(email);
                            let user =await userModel.findOne({email:email});
                            console.log(user);
                            if(user)
                            {
                                          let token=user.createResetToken();
                                          console.log(token);
                                          await user.save({validateBeforeSave:false});
                                          let resetLink=`http://localhost:3000/resetpassword/${token}`;
                                          let message={
                                                from:"pandey.nikhil086@gmail.com",
                                                to:email,
                                                subject:"Reset Password",
                                                text:resetLink,
                                          }
                                          let response=sendEmail(message)
                                          res.json({
                                                        message:"Reset Link is sent to mail",
                                                      //   resetLink,
                                                      response
                                          })
                            }
                            else{
                                          res.status(404).json({
                                                        message:"User not found ! Please sign up first !"
                                          })
                            }

              }
              catch(error){
                            res.status(501).json({
                                          message:"Failed to forget password",
                                          error
                            })
              }
}

async function resetPassword(req,res)
{
              try{
                            let token=req.params.token;
                            let {password , confirmPassword}=req.body;
                            const user=await userModel.findOne({
                                          pwToken:token,
                                          tokenTime:{ $gt:Date.now()}
                            })
                            if(user){
                                          user.resetPasswordHandler(password,confirmPassword);
                                          await user.save();
                                          res.status(200).json({
                                                        message:"Password reset succefully !!"
                                          })
                            }
                            else
                            {
                                          res.status(200).json({
                                                        message:"Password reset Link expired !!"
                                          })
                            }
              }
              catch(error){
                            res.status(404).json({
                                          message:"Failed to reset password !!",
                                          error
                            })
              }
}
module.exports.signup=signup;
module.exports.login=login;
module.exports.protectRoute=protectRoute;
module.exports.isAuthorized=isAuthorized;
module.exports.forgetPassword=forgetPassword;
module.exports.resetPassword=resetPassword;
module.exports.isLoggedIn=isLoggedIn;
module.exports.logout=logout;