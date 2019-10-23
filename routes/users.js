var express = require('express');
var router = express.Router();
var UserController = require('../controllers/users')
/* GET users listing. */
router.get('/', function(req, res, next) {
  const users = UserController.getUsers()
  res.json(users)
});

router.get('/:id', function(req, res, next){
  req.params.id
  const user = UserController.getUser(id)
  res.json(user)
})

router.post('/', function(req, res, next){
  const data = req.json()

})

module.exports = router;
