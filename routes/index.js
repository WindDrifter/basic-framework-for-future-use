var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/hello', function(req, res, next) {
  res.json({hello: 'hello'})
});

router.post('/api/login', function(req, res, next) {
  data = req.json()

});

module.exports = router;
