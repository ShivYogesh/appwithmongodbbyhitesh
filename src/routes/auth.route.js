const express=require('express');
const jwtAuthMiddleware=require('../middlewares/jwtAuthMiddleware.js');
const router=express.Router();
const {login,chkJWT}=require('../controllers/auth.controller.js');
//router.post("/register",authcontroller);
router.post('/login',login);
router.get('/chkjwt', chkJWT);
module.exports=router;