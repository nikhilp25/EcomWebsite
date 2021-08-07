const express=require("express");
const app=express();
const nodemailer=require("nodemailer");

async function sendEmail(){
              try{
                            var transporter = nodemailer.createTransport({
                                          host: "smtp.mailtrap.io",
                                          port: 2525,
                                          auth: {
                                            user: "51c7c5b7657b17",
                                            pass: "656134a820ed37"
                                          }
                                        });
                            await transporter.sendMail({
                                          from: 'pandey.nikhil086@gmail.com', // sender address
                                          to: "abc@test.com", // list of receivers
                                          subject: "Hello ✔", // Subject line
                                          text: "Hello this is testing", // plain text body
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
