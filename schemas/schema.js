const mongoose = require('mongoose');

const bloodScheme = new mongoose.Schema({
    quantity:{type:Number,min:0},
    
    bloodtype:{type:String,unique:true},
});
module.exports = mongoose.model('Blood',bloodScheme);
