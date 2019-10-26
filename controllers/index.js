var express = require('express');
var router = express.Router();
const User = require('../models/user')

/* GET home page. */
router.get('/hello', function(req, res, next) {
  res.json({hello: 'hello'})
});

router.post('/api/login', function(req, res, next) {
  const body = request.body
  
    


  
});

module.exports = router;
