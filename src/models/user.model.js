/*Start ---------- Header   */
const bcrypt = require('bcrypt');
const mongoose=require('mongoose');
const jwt = require('jsonwebtoken');
/*End ---------------Header  */
/*Start -------------- Schema  */
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true

    },
    userpassword: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true


    },
    mobileno: {
        type: String,
        unique: true

    },
    isactive: {
        type: Boolean,
        default: false

    },
    role: {
        type: String,
        required: true
    },
    picpath: {
        type: String
    },
    refreshToken: {
        type: String
    }
},
    {
        timestamps: true
    }
);
/*End -------------- Schema  */
/*Start -------------- Pre Function/Hook for Save This Hook making password hash  */
userSchema.pre('save', async function (next) {
    if (!this.isModified("userpassword")) {
        next();
    }
    try {
        const saltRound = await bcrypt.genSalt(10);
        this.userpassword = await bcrypt.hash(this.userpassword, saltRound);
    } catch (error) {
        next(error);

    }
});
/*End -------------- Pre Function for Save  */
/*Start -------------- Password Cheking Method Function for Chaking Password */
userSchema.methods.chkPassword = async function (clientPassword) {
    return (await bcrypt.compare(clientPassword, this.userpassword));
}
/*End -------------- Pre Function for Save  */
/*Start -------------- Genrate Acess Token  */
userSchema.methods.genrateAccessToken = async function () {
    return jwt.sign(
        {
        //Payload
            _id: this._id,
        username: this.username,
        email:this.email,
        userpicpath: this.picpath,
        userrole: this.role,
        isactive: this.isactive
    },
    process.env.JWT_ACCES_TOKEN_KEY,
    {
        expiresIn:process.env.JWT_TOKEN_EXPIRY
    }
);//End here jwt.sign
}//End Here userSchema.methods.genrateAccessToken = async function ()
/*End -------------- Genrate Acess Token  */
/*Start -------------- Genrate Refresh Token  */
userSchema.methods.genrateRefreshToken = async function () {
    return jwt.sign(
        {
        //Payload
        _id: this._id,
        username: this.username
    },
    process.env.JWT_ACCES_TOKEN_KEY,
    {
        expiresIn:process.env.JWT_TOKEN_EXPIRY
    }
);//End here jwt.sign
}//End Here userSchema.methods.genrateRefreshToken = async function ()
/*End -------------- Genrate Refresh Token  */
 const userModel = mongoose.model("user", userSchema);
module.exports=userModel;