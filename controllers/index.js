var express = require('express');
var router = express.Router();
const User = require('../models/user')
const milisecondFun = require('../utils/milisecondFun')
const CookieMaxAge = milisecondFun.dayToMiliseconds(30)
var passport = require('passport');

/* GET home page. */
router.get('/hello', function(req, res, next) {
  res.json({hello: 'hello'})
});

// router.post('/api/login', async function(req, res, next) {
//   const body = req.body
//   const usernameOrEmail = body.username
//   const remember = body.remember
//   try{
//     if(User.loginUser(body.username, body.password)){
//       const user = await User.findOne().or([{username: usernameOrEmail}, {email: usernameOrEmail}])
//       req.session.regenerate(function(err){
//         if (err){
//            console.log(err)
//         }
//       });

//       req.session.userID = user.id
//       req.session.remember = remember
//       req.session.cookie.maxAge = CookieMaxAge
//       req.session.save(
//         function(err){
//           if (err){
//              console.log(err)
//           }
//         }
//       )
//       // Set cookie to client
//       res.cookie('SessionID', req.session.id, {maxAge: CookieMaxAge}).json({message: 'success', username: user.username})
//     }
//     else{
//       res.status(403).json({error: 'Bad username/email and password combination'})
//     }
//   }
//   catch(error){
//       next(error)
//   }
// });

router.post('/api/login', passport.authenticate('login'), function(req, res){
  res.status(200).json({message: 'Login success', success: true})

})

router.get('/api/session', async function(req, res){
  try{
    if(req.session.userID){
      res.json({login: true})
    }
    else{
      res.json({login: false})
    }
  }
  catch(exception){
    res.json({error: exception.error})
  }
})


router.post('/api/logout', async function(req, res){
  req.session.destroy()
  res.cookie('SessionID', undefined).json({message: 'Successfully logout'})
})

module.exports = router;
