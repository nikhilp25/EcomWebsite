const express=require("express");
const {protectRoute,isAuthorized}=require("../Controller/authController")
const buildRouter=express.Router();

const {
              CreateBuild,
              AllBuild,
              getBuildById,
              updateBuildById,
              deleteBuildById,
}=require("../Controller/productController");



buildRouter
.route("")
.get(protectRoute,AllBuild)
.post(CreateBuild)


buildRouter
.route("/:id")
.get(protectRoute,getBuildById)
.patch(protectRoute,isAuthorized,updateBuildById)
.delete(protectRoute,isAuthorized,deleteBuildById);


module.exports=buildRouter;