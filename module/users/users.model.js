var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Users = new Schema({
    name:{
        type:String
    },
    phonenumber:{
        type:String
    },
    picture:{
        type:String
    },
    devicetoken:{
        type:String
    },
    socketid:{
        type:String
    },
    status:{
      type:String // value - online , offline
    },
    createddate:{
        type:String,
        default: new Date()
    }
})

module.exports = mongoose.model('Users',Users);
