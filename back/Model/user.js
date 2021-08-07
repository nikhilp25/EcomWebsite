const mongoose=require("mongoose");
// const dbUrl=require("../secrets/secrets");
const { DB_LINK } = require("../secrets/secrets");
const crypto=require("crypto");


mongoose.connect(DB_LINK,
{userNewURLParser:true, useUnifiedTopology:true}
)
.then((db)=>{
              console.log("Connect to db!!");
});

let userSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    require:true,
    unique:true
  },
  password:{
    type:String,
    minlength:[6,"Password must be  greater than 6 character"],
    required:true
  },
  confirmPassword:{
    type:String,
    minlength:[6,"Password must be greater than 6 characters"],
    validate:{
      validator:function(){
        return this.password=this.confirmPassword;
      },
      message:"Password didn't matched !!"
    }
  },
  role:{
    type:String,
    enum:["admin","user","resturant owner","delivery boy"],
    default:"user"
  },
  pwToken:String,
  tokenTime:String
})

userSchema.pre("save",function(){
  this.confirmPassword=undefined;
})

userSchema.methods.createResetToken=function(){
  let token=crypto.randomBytes(32).toString("hex");
  let time=Date.now()*60*10*1000;

  this.pwToken=token;
  this.tokenTime=time;
  // console.log(this.pwToken);
  // console.log(this.tokenTime);
  return token;
}
userSchema.methods.resetPasswordHandler=function(password,confirmPassword){
  this.password=password;
  this.confirmPassword=confirmPassword;
  this.pwToken=undefined;
  this.tokenTime=undefined;
}

const userModel=mongoose.model("userCollection",userSchema);

module.exports=userModel;


// [
//   { "id": "1", "name": "Nikhil", "Build": "Gaming" },
//   { "id": "2", "name": "Tom", "Build": "Design" },
//   { "id": "3", "name": "Mikky", "Build": "Coder", "Price": "Mid Range" },
//   { "id": "4", "name": "Face", "Build": "Bussiness" },
//   
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




// [
//   { "id": "1", "Name": "Nikhil", "email": "nikhil@gmail.com" },
//   { "id": "3", "Name": "Harry", "email": "harry@gmail.com", "name": "Harry" },
//   {
//     "name": "Steave",
//     "email": "steave@test.com",
//     "id": "a12b51f9-14f7-49b9-aaa9-8fbe081545ce"
//   },
//   {
//     "name": "Ronaldo",
//     "email": "Ronaldo@FC.com",
//     "id": "f3a2d01a-c5eb-4198-b214-8c5f01618eaa"
//   }
// ]
