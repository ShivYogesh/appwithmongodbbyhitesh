const logRequest=(req,res,next)=>{
    req.ur
    console.log(`Req on : ${new Date().toLocaleString()} Request URL :${req.originalUrl}`);
    next();
}
module.exports=logRequest;