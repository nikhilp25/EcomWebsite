let email=document.querySelector("#email");
let pw=document.querySelector("#pw");
let loginBtn=document.querySelector(".loginBtn");
let message=document.querySelector("#message");

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