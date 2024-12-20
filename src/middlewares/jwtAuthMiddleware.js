/* Start -------- Header */
require("dotenv").config({path:'./src/.env'});
//const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
/* End  --------- Header End Here  */
/* Start -------- Get All Data From a Get API Endpoint */
const getPayload = async (req, res,next) => {
 
    // console.log('in chk jwt function ');
  try {
  //  console.log('in try block chk jwt function ');
    const usertoken=req.headers.authorization.split(' ')[1];
    if(!usertoken)return res.status(401).json({error:'Unauthorized'}); 
    //console.log("Token : "+usertoken);
    //console.log("JWT Key Value : "+process.env.JWT_KEY);
    const tokenpayload=jwt.verify(usertoken,process.env.JWT_KEY);
    req.jwtpayload=tokenpayload;
    next();
    //res.status(200).json({ apidata: tokenpayload });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token - '+error.message  });
  }
}
/* End  --------- Get All Data From a Get API Endpoint  */
/* Start -------- Get All Data From a Get API Endpoint */
const genrateToken=async (userData)=>{
  return jwt.singn(userData,process.env.JWT_KEY);
}

/* End  --------- Get All Data From a Get API Endpoint  */

module.exports = {
  getPayload,
  genrateToken,
}
