let email=document.querySelector("#email");
let pw=document.querySelector("#pw");
let loginBtn=document.querySelector(".loginBtn");
let message=document.querySelector("#message");
let forgetPassword=document.querySelector(".forgetPassword");
// let changePasswordBtn=document.querySelector(".changePasswordbtn");
// let pdw=document.querySelector(".password");
// let cpw=document.querySelector(".confirmPassword");

// changePasswordBtn.addEventListener("click",async function(e){
//     try{
//         e.preventDefault();
//         if(pdw.value && cpw.value && pdw.value==cpw.value)
//         {
//             let token=document.URL.split("/");
//             token=token[token.length-1];
//             let obj=await axios.patch(`http://localhost:3000/api/users/resetpassword/${token}`,{password:pdw.value,confirmPassword:cpw.value});
//             console.log(obj);
//             pdw.value="";
//             cpw.value="";
//             if(obj.data.data)
//             {
//                 window.location.href="/";
//             }
//             else{
//                 message.innerHTML="Password didn't match";
//                 pdw.value="";
//                 cpw.value="";
//             }

//         }
//     }
//     catch(error){
//         console.log(error);

//     }
// })

forgetPassword.addEventListener("click",async function(e){
    try{
        e.preventDefault();
        if(email.value){
            let obj=await axios.post("http://localhost:3000/api/user/forgetpassword",{email:email.value});
            console.log(obj);
        }

        }
        catch(error){
            console.log(error);
        }
})

loginBtn.addEventListener("click",async function(e){
              try{
                            e.preventDefault();
                            if(email.value && pw.value){
                            let obj=await axios.post("http://localhost:3000/api/user/login",{email:email.value,password:pw.value});
                            console.log(obj);
                            if(obj.data.data){

                                window.location.href="/";
                            }
                            else
                            {
                                message.innerHTML=obj.data.message;
                            }
                     }

              }
              catch(error){
                            console.log(error);
              }
              
              
              // alert("Login btn is clicked !!");
})