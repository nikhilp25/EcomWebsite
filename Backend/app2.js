const express=require("express");
const app=express();
const nodemailer=require("nodemailer");

async function sendEmail(){
              try{
                            var transporter = nodemailer.createTransport({
                                          service:"gmail",  
                                          host: "smtp.gmail.com",
                                          secure:true,
                                          auth: {
                                            user: "pandey.nikhil086@gmail.com",
                                            pass: "cifxxkyuhoeimegm"
                                          }
                                        });
                            await transporter.sendMail({
                                          from: "pandey.nikhil086@gmail.com", // sender address
                                          to: "pandeyseema894@gmail.com", // list of receivers
                                          subject: "Hello ✔ mummy", // Subject line
                                          text: "Hello mummy", // plain text body
                                          html: "<b>Hello world?</b>", // html body
                                        });
              }
              catch(error){
                            return error;
              }
}

sendEmail().then(function(){
              console.log("Email sent !!");
}).catch(function(error){
              console.log("Email not sent");
})


app.listen(5500,function(){
              console.log("Server started at 5500");
})
