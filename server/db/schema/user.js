const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const userSchema = new Schema({
   name:String,
   telephone:Number,
   password:String,
   registerTime:{
        type:Date,
        default:new Date()
   }
});

module.exports = mongoose.model( 'user', userSchema);