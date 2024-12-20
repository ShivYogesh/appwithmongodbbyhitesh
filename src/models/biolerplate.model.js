/*  This File is Bioler Plate Code For Genrating Mongoose Model*/ 
/*Start ---------- Header   */
const mongoose=require('mongoose');
/*End ---------------Header  */
const modelSchema=new mongoose.Schema({},{timestamps:true});
const datamodel=mongoose.model("modelname",modelSchema)
//export const datamodel=mongoose.model("Data",modelSchema);
module.exports=datamodel;