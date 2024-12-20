/* ---------- Start ---------- */
const bcrypt=require('bcrypt');
/* ---------- End  ----------- */

const comparepassword=(stringpassword,hashpassword)=>{
    bcrypt.compare(stringpassword,hashpassword).then((result)=>{
        return result;
    }).catch((error)=>{
        console.log("I am in the error - commparepassword function");
        return false;
    })
    
}// End of ( const compare=(stringpassword,hashpassword)=>{)
module.exports={comparepassword}


