const mongoose = require('mongoose');
const userScheme = new mongoose.Schema({
    name:{type:String},
    phonenumber:{type:Number},
    email:{type:String,required:true,unique:true},
    bloodtype:{type:String,required:true},
    id:{type:Number},
});
module.exports = mongoose.model('User', userScheme);
