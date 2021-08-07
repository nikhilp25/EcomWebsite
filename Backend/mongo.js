// const express=require("express");

// const app=express();

const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://admin:admin@cluster0.z0sjo.mongodb.net/test?retryWrites=true&w=majority",
{userNewURLParser:true, useUnifiedTopology:true}
)
.then((db)=>{
              console.log(db);
});

let planSchema=new mongoose.Schema({
              name:String,
              price:Number
})
const planModel=mongoose.model('planCollection',planSchema);

planModel.create({
              name:"Vegan",
              price:50
}).then((plan)=>{
              console.log(plan);
})
.catch((error)=>{
              console.log(error);
})

