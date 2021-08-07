const productModel = require("../Model/product");

// function getDemoPage(req,res)
// {
//               res.render("base.pug");
// }
function getHomePage(req,res)
{             
              res.render("homepage.pug",{name:req.name});
}
function getLoginPage(req,res)
{
              res.render("login.pug",{name:req.name});
}
function getSignUpPage(req,res)
{
              res.render("signup.pug",{name:req.name});
}
async function getProductPage(req,res)
{
              try{
              let product=await productModel.find();
              console.log(product);
              res.render("products.pug",{name:req.name, product:product});
              }
              catch(error)
              {
                            console.log(error);
              }
}
// module.exports.getDemoPage=getDemoPage;
module.exports.getHomePage=getHomePage;
module.exports.getLoginPage=getLoginPage;
module.exports.getSignUpPage=getSignUpPage;
module.exports.getProductPage=getProductPage;
