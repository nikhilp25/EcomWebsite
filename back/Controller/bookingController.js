const stripe = require("stripe");
const userModel=require("../Model/user");
const productModel=require("../Model/product");
const stripeObj=stripe('sk_test_51JNa7BSEp71BuU6xZ0z1nCKtbkNrWN7X74N0aMDh3vDT9pYBDHnNJ8Ks9DZYjmL1Q9ahKRAGv2B9ztyBINy8jN3C00WPUcdj20');

async function createPaymentSession(req,res){
              try{
                  const userId=req.id;
                  const {productId}=req.body;
                  const product=await productModel.findById(productId);
                  const user=await userModel.findById(userId);

                  const sessions=await stripeObj.checkout.sessions.create({
                    payment_method_types: ['card'],
                    customer:user.name,
                    customer_email:user.email,
                    line_items: [
                      {
                        price_data: {
                          currency: 'usd',
                          product_data: {
                            name: product.name,
                          },
                          unit_amount: product.price,
                        },
                        quantity: 1,
                      },
                    ],
                    mode: 'payment',
                    success_url: 'https://localhost:3000/',
                    cancel_url: 'https://localhost:3000/',
                  })
                  res.json({
                      sessions
                  })
              }
              catch(error){
                res.json({
                    message:"Failed to create payment session",
                    error
                })
              }
}

module.exports.createPaymentSession=createPaymentSession;