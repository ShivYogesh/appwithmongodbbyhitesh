const dataModel=require('../models/user.model.js')
/* Get All Data From a Get API Endpoint  */
const getAll=async(req,res)=>{
  try {
      const data=await dataModel.find();  
      return data;
      //res.status(200).json({apidata:data});
    } catch (error) {
      return error;
      //res.status(500).json({message:error.message});
    }
}
/* Get One Data From a Get API Endpoint  basess of id */

/* Update One Data From a PUT API Endpoint  */

/* Delete One Data From a Delete API Endpoint  */

module.exports={
  getAll,
}
