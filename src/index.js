require("dotenv").config({path:'./src/.env'});
const userRoute=require('./routes/user.route.js');
const db=require('../src/db/connection.js');
const logging=require('../src/middlewares/logging.js');
const authRoute=require('./routes/auth.route.js');
const app=require('express');
const connectDB = require("../src/db/connection.js");
const port=process.env.SERVER_PORT||8000;
// const app=express();

/*Start ----------------- All Midelware  Here */ 
/* Start -------------------Database Connection Here */ 
connectDB()
.then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running -new on Port ${port}`);
    });
})
.catch((error)=>{
    console.log("Database Conncetion Failed And error is : ",error);
});
/*End ------------------------- Databse Connection Here */
//app.use(logging);// logging All Request in console
//app.use(express.json());
//app.use(express.urlencoded({ extended: true }))
/* End -------------------All Midelware  Here */

/* Start ----------------- All Routes Here  */
//app.get("/testing",(req,res)=>{res.send("testing api")});
//app.use("/api/user",userRoute);
//app.use("/api/auth",authRoute);

/* End --------------------- All Routes Here */
/*Start -------------------- Server Runing Code */ 

//app.listen(port,()=>{
//    console.log("Server Is Lesning on Port : "+port);
//});

/* End --------------------- Server Runing Code */