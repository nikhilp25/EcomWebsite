let changePasswordBtn=document.querySelector("#changePasswordbtn");
let pdw=document.querySelector("#pdw");
let cpw=document.querySelector("#cpw");

changePasswordBtn.addEventListener("click",async function(e){
              e.preventDefault();
     try{
        e.preventDefault();
        if(pdw.value && cpw.value && pdw.value==cpw.value)
        {
            let token=document.URL.split("/");
            token=token[token.length-1];
            let obj=await axios.patch(`http://localhost:3000/api/users/resetpassword/${token}`,{password:pdw.value,confirmPassword:cpw.value});
            console.log(obj);
            pdw.value="";
            cpw.value="";
            if(obj.data.data)
            {
                window.location.href="/";
            }
            else{
                message.innerHTML=obj.data.message;
            }
        }
        else
        {
                      message.innerHTML="Password didn't match";
                      pdw.value="";
                      cpw.value="";
        }
    }
    catch(error){
        console.log(error);

    }
})