'use strict';

var Users = require('./../users/users.model');

class Helper{
    updateuserstatus(userId,socketId,status,callback){
       Users.findOneAndUpdate({
           _id:userId
       },{$set:{
        socketid:socketId,
        status:status
       }},function(error,success){
        callback(error, success);
       })
    }

    updateuserstatusonsocket(socketid,status){
        Users.findOneAndUpdate({
            socketid:socketid
        },{$set:{
         socketid:'',
         status:status
        }},function(error,success){
         callback(error, success);
        })
    }
}

module.exports = new Helper();
