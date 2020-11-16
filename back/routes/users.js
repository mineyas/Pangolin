var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require('passport');
const { read } = require("fs");


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// REGISTER PANGOLIN
router.post("/register", function (req, res, next) {
  addToDB(req, res)
});

async function addToDB(req, res) {
  var user = new User({
    email: req.body.email,
    name: req.body.name,
    password: User.hashPassword(req.body.password),
    creation_dt: Date.now(),
  });

  try {
    doc = await user.save();
    return res.status(201).json(doc);
  } catch (err) {
    return res.status(501).json(err);
  }
}


// LOGIN PANGOLIN
router.post('/login',function(req,res,next){
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.status(501).json(err); }
    if (!user) { return res.status(501).json(info); }
    req.logIn(user, function(err) {
      if (err) { return res.status(501).json(err); }
      return res.status(200).json({message:'Login Success'});
    });
  })(req, res, next);
});

// USER PAGE AVAIABLE ONLY WHEN LOGGED IN
router.get('/user',isUserEnter,function(req,res,next){
  return res.status(200).json(req.user);
});

// LOG OUT
router.get('/logout',isUserEnter, function(req,res,next){
  req.logout();
  return res.status(200).json({message:'Logout Success'});
})

router.get('/profile', isUserEnter, function(req, res, next){
  return res.status(200).json(req.user);

})

router.put('/profile/:id', isUserEnter, function(req,res, next){
  
})


function isUserEnter(req,res,next){
  if(req.isAuthenticated()) next();
  else return res.status(401).json({message:'Unauthorized Request'});
}


module.exports = router;
