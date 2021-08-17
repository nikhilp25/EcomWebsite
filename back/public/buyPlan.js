let buyProduct=document.querySelectorAll(".signup-button a");
let allLis=document.querySelectorAll(".navigation li");
const stripe=Stripe("pk_test_51JNa7BSEp71BuU6xKPfiSlWRE4hQ5U9W7m8JzLBPdesqwYBQU3cpgPzjcdywpRwMaak4VZXuWDcDK1GQ9uMwPrUi00kKHhEl8R");

for(let i=0;i<buyProduct.length;i++)
{
              buyProduct[i].addEventListener("click",async function(){

                            try{

                                          if(allLis.length<5){
                                                        window.location.href="/login";
                                          }
                                          else
                                          {
                                           let productId=buyProduct[i].getAttribute("prodId");
                                           let session=await axios.post("http://localhost:3000/api/booking/createPaymentSession",{productId:productId});
                                           console.log(session);
                                           let sessId=session.data.session.id;
                                           let ans=await stripe.redirectToCheckout({sessionId:sessId});
                                           console.log(ans);
                                          }
                            }
                            catch(error){
                                          alert(error.message);
                            }

              })
}
