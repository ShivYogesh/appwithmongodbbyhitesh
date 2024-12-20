require("dotenv").config({path:'./src/.env'});
const mongoose=require('mongoose');
const dbstring=process.env.DB_CONN_STRING+process.env.DB_NAME;
const connectDB=async()=>{
    try {
        const connectionInstance=await mongoose.connect(`${dbstring}`);
        console.log(`\n MongoDB Connected !! DB Host : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Error in Connectiong Database with eror",error);
        process.exit(1);
    }
}
module.exports=connectDB;
/*
mongoose.connect(dbstring);
const db="";
try {
     db=mongoose.connection;
    db.on('error',(error)=>{
        console.log(error)
    });
    db.on('Connected',()=>{
        console.log('Conted to Database')
    });
    db.on('disconnected',()=>{
        console.log('Database Disconnected ')
    });
} catch (error) {
 console.log(error.message);  
}
module.exports=db;

*/