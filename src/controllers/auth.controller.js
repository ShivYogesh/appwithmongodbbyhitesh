/* Start -------- Header */
require("dotenv").config({ path: './src/.env' });
const userModel = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
//const jwt = require('../middlewares/jwtAuthMiddleware');
const bcryptServices = require('../services/bcrypt.services');
/* End  --------- Header End Here  */
/* Start -------- Get All Data From a Get API Endpoint */
const login = async (req, res) => {

  try {
    const searchData = req.body.username;
    const searchuserpassword = req.body.userpassword;
    const data = await dataModel.findOne({ username: searchData });
    if (data == null)//User Not  Found In Database
    {
      res.status(500).json({
        success: false,
        message: "Wrong User Name User Not Found In Database "
      });
      return;
    }
//is user not activate 
if(data.isactive!=true)
{
  res.status(401).json({
    success: false,
    message: "User is Not Active Contact to Admin"
  });
  return;
}

    bcrypt.compare(req.body.userpassword, data.userpassword)
      .then((result) => {
        if (result == true) {
          const payloadData = {
            id:data._id,
            username: data.username,
            userpicpath: data.picpath,
            userrole: data.role,
            isactive: data.isactive
          };
          const token = jwt.sign(payloadData,process.env.JWT_KEY);
          res.status(202).json({ success: true,tokenval: token });
        }
        else {
          res.status(401).json({ success: false,
            message: "Wrong User Name User Not Found In Database " });
        }
      })
      .catch((error)=>{res.status(401).json({ success: false,
        message: "Wrong User Name User Not Found In Database " })});

} catch (error) {
  res.status(401).json({ success: false,
    message: "Wrong User Name User Not Found In Database " });
}
  }
/* End  --------- Get All Data From a Get API Endpoint  */


/* Start -------- Get All Data From a Get API Endpoint */
const chkJWT = async (req, res) => {
  // console.log('in chk jwt function ');
  try {
    //  console.log('in try block chk jwt function ');
    const usertoken = req.headers.authorization.split(' ')[1];

    if (!usertoken) return res.status(401).json({ error: 'Unauthorized' });
    //console.log("Token : "+usertoken);
    //console.log("JWT Key Value : "+process.env.JWT_KEY);
    const tokenpayload = jwt.verify(usertoken, process.env.JWT_KEY);
    req.jwtpayload = tokenpayload;
    res.status(200).json({ apidata: tokenpayload });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token - ' + error.message });
  }
}
/* End  --------- Get All Data From a Get API Endpoint  */


module.exports = {
  login,
  chkJWT,

}


