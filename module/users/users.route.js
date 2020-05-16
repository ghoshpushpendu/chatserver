const express = require('express');
const router = express.Router();
const Users = require('./users.model');
const  firebaseadmin  = require('./../firebase/firebase.admin');

router.post('/create',function(req,res){
    req.body.phonenumber = '91'+req.body.phonenumber;
    let user = new Users(req.body);

    Users.findOne({
        phonenumber:req.body.phonenumber
    },function(error,success){
        if(!error && success != null){
           // user already exixts, so update the user
           Users.findOneAndUpdate({
               phonenumber:req.body.phonenumber
           },{$set:req.body},function(error,success){
            res.status(200).send({
                error:false,
                message:'User have been updated successfully',
                data:success
            })
           })
        }else{
           // user do not exists, so create new user
           user.save(function(error,success){
            if(!error && success != null){
               res.status(200).send({
                   error:false,
                   message:'User have been saved successfully',
                   data:success
               })
            }else{
                res.status(200).send({
                    error:false,
                    message:'User have been saved successfully',
                    data:error
                })
            }
        });
        }
    })
});


router.put('/update',function(req,res){
    let user_id = req.query._id;
    Users.findOneAndUpdate({
        _id:user_id
    },{$set:req.body},function(error,success){
     if(!error){
        res.status(200).send({
            error:false,
            message:'User have been updated successfully',
            data:success
        })
     }else{
        res.status(200).send({
            error:true,
            message:'User can not be updated',
            data:error
        })
     }
    })
})

router.delete('/delete',function(req,res){
  let user_id = req.query._id;
  Users.remove({
      _id:user_id
  },function(error,success){
      if(!error){
        res.status(200).send({
            error:false,
            message:'User have been deleted successfully',
            data:success
        })
      }else{
        res.status(200).send({
            error:true,
            message:'User can not be deleted',
            data:error
        })
      }
  }) 
})

router.get('/get',function(req,res){
    let phonenumber  = req.query.phonenumber;
    Users.findOne({
        phonenumber:phonenumber
    },function(error,success){
        if(!error && success != null){s
            res.status(200).send({
                error:false,
                message:'User got successfully',
                data:success
            })
        }else{
            res.status(200).send({
                error:true,
                message:'User not found',
                data:error
            })
        }
    })
})

router.post('/sendmessage',function(req,res){
     let message = req.body;
     let user_id = req.query._id;
     Users.findOne({
         _id:user_id
     },function(error,success){
         if(!error && success != null){
           let deviceToken = success.devicetoken;
           let notification_options = {
            priority: "high",
            timeToLive: 60 * 60 * 24
          };
          firebaseadmin.messaging().sendToDevice(registrationToken, message, options)
          .then( response => {
    
           res.status(200).send({
               error:false,
               message:'Message sent successfully',
               data:response
           })
           
          })
          .catch( error => {
            
            res.status(200).send({
                error:false,
                message:'Message can not be sent',
                data:error
            })

          });
         }else{

         }
     })
})

module.exports = router;