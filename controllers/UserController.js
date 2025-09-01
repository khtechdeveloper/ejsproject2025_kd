const User = require('../models/User');
const student=require('../models/Student');
const bcrypt = require('bcrypt');
const Student = require('../models/Student')

async function addUser(req, res){
    try{
      console.log(req.body, 'req.body');
      let user = new User(req.body);
  
      let encryptedpassword = bcrypt.hashSync(req.body.password,10);
      console.log(encryptedpassword, 'encryptedpassword');
      user.password = encryptedpassword;
      await user.save();
      // console.log("data save successfully...");
      res.redirect('/');
    }catch(err){
       console.log(err);
    }
}

async function doLogin(req, res){
  try{
    // console.log(req.body, 'req.body');
    let user = await User.findOne({ email: req.body.email });
    console.log(user);
    if(user){
      let validPassword = await bcrypt.compare(req.body.password, user.password);
      if(validPassword){
        if(user.userType==='Admin'){
        let students=await Student.find({});
        res.render('welcomehome', {
          students: students
        });
        }else{
          res.render('welcomestudent');
      }
      }else{
        res.end("<h1> Invalid email/password...");
      }
    }else{
      res.end("<h1> user does not exist...");
    }
  }catch(err){

  }
}

module.exports = {
    addUser,
    doLogin
}

