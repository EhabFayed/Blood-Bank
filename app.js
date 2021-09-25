const createError = require('http-errors');
const mongoose= require('mongoose');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const Blood = require('./schemas/schema');
const User = require('./schemas/userSchema');
const app = express();
app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017/bloodbank')
app.get('/bloodstock',async(req, res)=>{
  const data =await Blood.find();
  res.send(data);
})

app.get('/user',async(req, res)=>{
  const data =await User.find();
  res.send(data);
})
//doneer
app.post('/user/add',async(req, res)=>{
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
    res.send(response);
    
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
//await newuser.find({$text :{$search:"newuser.bloodtype"}},{$inc:{quantity:-1}})
//sekeer
app.post('/user/req',async(req, res)=>{
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
    bloodtype = await Blood.findOne({bloodtype:newuser.bloodtype})
    console.log(bloodtype);
    if(bloodtype.quantity===0){
      res.send("sorry bloodtype is out of stock try later ");
    }else{
      const response = await newuser.save().catch((e)=>console.error(e));
      res.send(response);

    }
    
  
    switch(newuser.bloodtype){
      case "A+":
        return (
          await Blood.update({_id: '614a134153587cbe5714648e', quantity: { $gt: 0 }}, {$inc: {quantity: -1 }},
          console.log("user blood type",newuser.bloodtype)))
      case "B+":
        return (
          await Blood.update({_id: '614a13a553587cbe5714648f', quantity: { $gt: 0 }}, {$inc: {quantity: -1 }},
          console.log("user blood type",newuser.bloodtype)))
      case "AB+":
        return (
          await Blood.update({_id: '614a13d953587cbe57146490', quantity: { $gt: 0 }}, {$inc: {quantity: -1 }},
          console.log("user blood type",newuser.bloodtype)))  
      case "AB-":
        return (
          await Blood.update({_id: '614a15a953587cbe57146494', quantity: { $gt: 0 }}, {$inc: {quantity: -1 }},
          console.log("user blood type",newuser.bloodtype))) 
      case "A-":
        return (
          await Blood.update({_id: '614a159553587cbe57146492', quantity: { $gt: 0 }}, {$inc: {quantity: -1 }},
          console.log("user blood type",newuser.bloodtype))) 
      case "B-":
        return (
          await Blood.update({_id: '614a159f53587cbe57146493', quantity: { $gt: 0 }}, {$inc: {quantity: -1 }},
          console.log("user blood type",newuser.bloodtype)))   
      case "O-":
        return (
          await Blood.update({_id: '614a15b553587cbe57146495', quantity: { $gt: 0 }}, {$inc: {quantity: -1 }},
          console.log("user blood type",newuser.bloodtype)))    
      case "O+":
        return (
          await Blood.update({_id: '614a15c353587cbe57146496', quantity: { $gt: 0 }}, {$inc: {quantity: -1 }},
          console.log("user blood type",newuser.bloodtype)))   
        default :
        return ""
        } 
      }
  }

);
app.put("/user/:id",async (req, res) => {
  const body =req.body;
  const id=req.params.id;
  let error;
  const data = await User.findByIdAndUpdate(
      id,
      {...body},
      {runValidatorhadis: true,new:true,useFindAndModify:false}
  ).catch((e)=>{
          error=e;
  });
  if (!data) {
      res.statusCode=400;
      res.send(error);
  }else{
      res.send(data);
  } 
});

app.delete("/user/:id",async(req, res) => {
  const id=req.params.id;
  let error;
  const data = await User.findByIdAndDelete(id).catch((e)=>{
      error=e;
  });
  if (error) {
      res.statusCode=400;
      res.send(error);
  }else{
      res.send(data);
  } 
});






// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
