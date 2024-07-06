const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/chat').then(()=> console.log("mongodb are connecting"))

const userSchema = mongoose.Schema({
    name:{
        type:String,
        minLength: 3,
        maxLength: 12,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        minLength: 2,
        maxLength: 12,
        required:true,
    },
    is_online:{
        type:String,
        default:'0'
    },
},
{timestamps:true}
);

module.exports = mongoose.model('user', userSchema);