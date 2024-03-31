const mongoose = require('mongoose');
const bcrypt =require('bcryptjs');
const jwt= require('jsonwebtoken'); 


const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true
    },
    password : {
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    }
}, { timestamps: true })



userSchema.pre('save',async function (next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,5);       //five rounds of salting in hashing
        this.cpassword = await bcrypt.hash(this.cpassword,5);
    }
    next();
});

userSchema.methods.generateAuthToken = async function () {
    try{
        const user = "";
        let token = jwt.sign({_id:user._id},process.env.SECRET_KEY);
        console.log(token);
        //this.tokens = this.tokens.concat({token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

const User = mongoose.model('user_regs',userSchema);//user_info is collection name and mongodb atlas will create user_infos (plural)

module.exports = User;