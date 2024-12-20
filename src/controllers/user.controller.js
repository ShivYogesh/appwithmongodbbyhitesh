/* Start -------- Header */
const userModel = require('../models/user.model.js');
const bcrypt=require('bcrypt');

/* End  --------- Header End Here  */

/* Start -------- Get All Data From a Get API Endpoint */
const findAll = async (req, res) => {
  try {
    const data = await dataModel.find();
    res.status(200).json({success:true,apidata:data});
  } catch (error) {
    res.status(500).json({ success:false, message: error.message });
  }
}
/* End  --------- Get All Data From a Get API Endpoint  */

/* Start -------- Get All Data From a Get API Endpoint */
const findOnebyid = async (req, res) => {
  try {
    const searchData = req.params.id;
    const data = await dataModel.find({ _id: searchData });
    res.status(200).json({ success:true,apidata: data });
  } catch (error) {
    res.status(500).json({ success:false, message: error.message });
  }
}
/* End  --------- Get All Data From a Get API Endpoint  */
/* Start -------- Get All Data From a Get API Endpoint */
const findOnebyusername = async (req, res) => {
 
  try {
    const searchData = req.params.username;
    console.log(searchData);
    const data = await dataModel.find({ username: searchData });
    res.status(200).json({ success:true,apidata: data });
  } catch (error) {
    res.status(500).json({ success:false, message: error.message });
  }
}
/* End  --------- Get All Data From a Get API Endpoint  */
/* Start -------- Adding New Record in a Tabel Endpoint */
const addNew = async (req, res) => {
  try {
    const bodydata = req.body;
    const data = new userModel(bodydata);  // Asiening req boady data to a variabel
    const responesdata = await data.save();// geting Back respone data which ever save in database
    console.log('data saved');
    res.status(201).json({ success:true,apidata:responesdata });

  } catch (error) {
    res.status(500).json({success:false, message: error.message });
  }
}
/* End  --------- Adding New Record in a Tabel Endpoint  */
/* Start -------- Updating Old Record in a Tabel Endpoint */
const updateByid = async (req, res) => {
  console.log(" i am in updating call..");
  try {
    const searchData = req.params.id;
    const dbModeldata = await dataModel.findOne({ _id: searchData });
    if (!dbModeldata)// record not found
    {
      res.status(404).json({ success:false,message: "Data Not Found" });
    }
    //const saltRound = await bcrypt.genSalt(10);
    //const hashPassword = await bcrypt.hash(req.body.userpassword, saltRound);
    const data = await dbModeldata.updateOne({
      'username': req.body.username,
      'email':req.body.email,
      'mobileno':req.body.mobileno,
      'userpassword':req.body.username, //hashPassword,
      'isactive': req.body.isactive,
      'role': req.body.role,
      'picpath':req.body.picpath

    });
    res.status(200).json({ apidata: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
/* End  --------- Updatating Old Record in a Tabel Endpoint  */
/* Start -------- Updating Old Record in a Tabel Endpoint */
const updateByUserName = async (req, res) => {
console.log("i am in update by name function ");
  try {
    const searchData = req.params.username;
    const dbModeldata = await dataModel.findOne({ username: searchData });
    if (!dbModeldata)// record not found
    {
      res.status(404).json({ message: "Data Not Found" });
    }

    const saltRound = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.userpassword, saltRound);
    const data = await dbModeldata.updateOne({
      'username': req.body.username,
      'email':req.body.email,
      'mobileno':req.body.mobileno,
      'userpassword':hashPassword,//req.body.userpassword,
      'isactive': req.body.isactive,
      'role': req.body.role

    });
    res.status(200).json({ apidata: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
/* End  --------- Updatating Old Record in a Tabel Endpoint  */

/* Start -------- Updating Old Record in a Tabel Endpoint */
const deleteByid = async (req, res) => {
  console.log("Calling Deleteting User Function ....");
  try {
    const searchData = req.params.id;
    const dbModeldata = await dataModel.deleteOne({ _id: searchData });
    res.status(200).json({ apidata: dbModeldata });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
/* End  --------- Updatating Old Record in a Tabel Endpoint  */


module.exports = {
  findAll,
  findOnebyid,
  addNew,
  updateByid,
  deleteByid,
  findOnebyusername,
  updateByUserName,
}


