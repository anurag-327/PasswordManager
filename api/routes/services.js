const router=require('express').Router();
const services_controller=require("../controller/services");
const {verifyToken}=require("../controller/verifyToken")

// route to handle adding of new services
router.post("/addcredential",verifyToken,services_controller.addCredential);
router.get("/getcredentials",verifyToken,services_controller.getCredentials);
router.get("/getsinglecredential",verifyToken,services_controller.getSingleCredential);
router.get("/getuser",verifyToken,services_controller.getUser);
router.delete("/deletecredential/:id",verifyToken,services_controller.deleteCredential);
router.post("/decrypt",verifyToken,services_controller.decrypt);
module.exports=router;