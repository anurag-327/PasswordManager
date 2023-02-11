const router=require("express").Router(); 
const auth_controller=require("../controller/auth_controller")
const {verifyToken}=require("../controller/verifyToken")

// route to handle registration
router.post("/register",auth_controller.register)
// route to handle login
router.post("/login",auth_controller.login);
// route to handle password verification
router.post("/validate",verifyToken,auth_controller.validate);


module.exports=router