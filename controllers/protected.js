var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('', function(req, res, next) {
  res.json({hello: 'hello, you are protected'})
});

router.post('/testpost', function(req, res, next) {
  const body = req.body
  data = res.json(body)
});

module.exports = router;
