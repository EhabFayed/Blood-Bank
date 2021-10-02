const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Blood = require('../schemas/schema');
const User = require('../schemas/userSchema');
//const {forwardAuthenticated}= require('../config/auth');

/* GET home page. */
router.get('/', (req, res,next)=> {
  res.render('home');
});
router.get('/doneer',(req, res)=> {
  res.render('doneer');
})
router.get('/sekeer',(req, res)=> {
  res.render('sekeer');
})

router.post('/doneer',async(req, res)=> {
  const body = req.body;
  console.log(req.body);
  const newuser= new User({ 
    name: body.name,
    email: body.email,
    phonenumber: body.phonenumber,
    bloodtype: body.bloodtype,
    id: body.id,});
  const error =newuser.validateSync();
  if(error){
    res.statusCode= 400;
    res.send(error.message);
  }else{
    const response = await newuser.save().catch(err =>console.log(err));
    
    switch(newuser.bloodtype){
      case "A+":
        return (
          await Blood.findByIdAndUpdate("614a134153587cbe5714648e", {$inc:{quantity:+1}}),
          console.log("user blood type",newuser.bloodtype))
      case "B+":
        return (
          await Blood.findByIdAndUpdate("614a13a553587cbe5714648f", {$inc:{quantity:+1}}),
          console.log("user blood type",newuser.bloodtype))
      case "AB+":
        return (
          await Blood.findByIdAndUpdate("614a13d953587cbe57146490", {$inc:{quantity:+1}}),
          console.log("user blood type",newuser.bloodtype))  
      case "AB-":
        return (
          await Blood.findByIdAndUpdate("614a15a953587cbe57146494", {$inc:{quantity:+1}}),
          console.log("user blood type",newuser.bloodtype)) 
      case "A-":
        return (
          await Blood.findByIdAndUpdate("614a159553587cbe57146492", {$inc:{quantity:+1}}),
          console.log("user blood type",newuser.bloodtype)) 
      case "B-":
        return (
          await Blood.findByIdAndUpdate("614a159f53587cbe57146493", {$inc:{quantity:+1}}),
          console.log("user blood type",newuser.bloodtype))   
      case "O-":
        return (
          await Blood.findByIdAndUpdate("614a15b553587cbe57146495", {$inc:{quantity:+1}}),
          console.log("user blood type",newuser.bloodtype))    
      case "O+":
        return (
          await Blood.findByIdAndUpdate("614a15c353587cbe57146496", {$inc:{quantity:+1}}),
          console.log("user blood type",newuser.bloodtype))   
        default :
        return ""
        } 
      }
  }

);
//sekeer
router.post('/sekeer',async(req, res)=>{
  const body = req.body;
  console.log(req.body);
  const newuser= new User({
    usertype: body.usertype,
    name: body.name,
    email: body.email,
    phonenumber: body.phonenumber,
    bloodtype: body.bloodtype,
    id: body.id,
  });
  const error =newuser.validateSync();
  if(error){
    res.statusCode= 400;
    res.send(error.message);
  }else{
      const response = await newuser.save().catch((e)=>console.error(e));

    switch(response.bloodtype){
      case "A+":
        return (
          await Blood.findOneAndUpdate({_id: '614a134153587cbe5714648e', quantity: { $gt: 0 }}, {$inc: {quantity: -1 }},
          console.log("user blood type",newuser.bloodtype)))
      case "B+":
        return (
          await Blood.findOneAndUpdate({_id: '614a134153587cbe614a13a553587cbe5714648f', quantity: { $gt: 0 }}, {$inc: {quantity: -1 }},
          console.log("user blood type",newuser.bloodtype)))
      case "AB+":
        return (
          await Blood.findOneAndUpdate({_id: '614a13d953587cbe57146490', quantity: { $gt: 0 }}, {$inc: {quantity: -1 }},
          console.log("user blood type",newuser.bloodtype)))  
      case "AB-":
        return (
          await Blood.findOneAndUpdate({_id: '614a15a953587cbe57146494', quantity: { $gt: 0 }}, {$inc: {quantity: -1 }},
          console.log("user blood type",newuser.bloodtype))) 
      case "A-":
        return (
          await Blood.findOneAndUpdate({_id: '614a159553587cbe57146492', quantity: { $gt: 0 }}, {$inc: {quantity: -1 }},
          console.log("user blood type",newuser.bloodtype))) 
      case "B-":
        return (
          await Blood.findOneAndUpdate({_id: '614a159f53587cbe57146493', quantity: { $gt: 0 }}, {$inc: {quantity: -1 }},
          console.log("user blood type",newuser.bloodtype)))   
      case "O-":
        return (
          await Blood.findOneAndUpdate({_id: '614a15b553587cbe57146495', quantity: { $gt: 0 }}, {$inc: {quantity: -1 }},
          console.log("user blood type",newuser.bloodtype)))    
      case "O+":
        return (
          await Blood.findOneAndUpdate({_id: '614a15c353587cbe57146496', quantity: { $gt: 0 }}, {$inc: {quantity: -1 }},
          console.log("user blood type",newuser.bloodtype)))   
        default :
        return ""
        } 
      }
  }

);


module.exports = router;
