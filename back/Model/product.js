const mongoose=require("mongoose");
// const dbUrl=require("../secrets/secrets");
const { DB_LINK } = require("../secrets/secrets");

mongoose.connect(DB_LINK,
{userNewURLParser:true, useUnifiedTopology:true}
)
.then((db)=>{
              console.log(db);
});

let productSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
    maxlength:[40,"Your product name has more than 40 character"]
  },
  discription:{
    type:String,
    maxlength:[200,"Discription should be less than 200 character"]
  },
  quantity:{
    type:Number,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  weight:{
    type:Number,
    required:true
  },
  category:{
    type:String,
    required:true
  },
  discount:{
    type:Number,
    validate:{
      validator:function(){
        return this.discount<this.price;
      },
      message:"Discount must be less than actual price",
    }
  } 

})

const productModel=mongoose.model("productCollection",productSchema);

module.exports=productModel;


// [
//   { "id": "1", "name": "Nikhil", "Build": "Gaming" },
//   { "id": "2", "name": "Tom", "Build": "Design" },
//   { "id": "3", "name": "Mikky", "Build": "Coder", "Price": "Mid Range" },
//   { "id": "4", "name": "Face", "Build": "Bussiness" },
//   {
//     "Name": "Terry",
//     "build": "Gaming",
//     "id": "da025348-fb42-4003-b4d8-e5c348cc1bdd"
//   },
//   {
//     "Name": "Harry",
//     "build": "Developer",
//     "id": "c5684928-025d-4bda-bc47-ea07e1b00c35"
//   },
//   {
//     "name": "Ronaldo",
//     "build": "Gaming",
//     "id": "c13df638-1aea-486c-acee-1baf283597b3"
//   }
// ]
