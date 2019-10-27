const User = require('../models/user')
var expect = require('chai').expect
var should = require('chai').should
const helper = require('./test_helper')


describe('testing model', ()=>{ 
  beforeEach(async function(){
    await User.deleteMany({})
    const userObjects = helper.initialUsers.map(user => new User(user))
    const promiseArray = await userObjects.map(user => user.save())
    await Promise.all(promiseArray)
  })
  describe('password encyption related test', function(){
    it('ensure password is encrypted in db', async function(){
      try{
        const newUser = {
            name: 'Blog blah',
            username: "OOfff123",
            email: "test@email.com",
            password: "12345566"
        }
        const user = new User(newUser)
        const savedUser = await user.save()
        const userPassword = savedUser.password
        expect(userPassword).not.to.equal(undefined)
        expect(userPassword).not.to.equal("12345566")
      }
      catch(error){
          console.log(error)
      }
    })
  })
  describe('testing validation and uniqueness', function(){
    it('ensure password length is at least 6', async function(){
      const newUser = {
          name: 'Blog blah',
          username: "OOfff123",
          email: "test@email.com",
          password: "11111"
      }
      const user= new User(newUser)
      await user.validate(function(err) {
        expect(err.errors.password).to.exist
      });
    })
    it('ensure unique username', async function(){
      const user = newUser = {
        name: 'Blog blah',
        username: helper.initialUsers[0].username,
        email: "test@email.com",
        password: 'isdfsfsfokljs'
      }
      const user2= new User(user)
      await user2.validate(function(err) {
        expect(err.errors.username).to.exist
      });
    })
    it('ensure unique email', async function(){
      const user = newUser = {
        name: 'Blog blah',
        username: 'Username1',
        email: helper.initialUsers[0].email,
        password: 'isdfsfsfokljs'
      }
      const user2= new User(user)
      await user2.validate(function(err) {
        expect(err.errors.email).to.exist
      });
    })
  })
  describe('testing static function', function(){
    it('testing findOneByUserName', async function(){
      const user1 = helper.initialUsers[0]
      const result = await User.findOneByUserName(user1.username)
      expect(user1.username).to.equal(result.username)
      expect(user1.email).to.equal(result.email)
    })
    it('testing loginUser with username', async function(){
      const user1 = helper.initialUsers[0]
      const match = await User.loginUser(user1.username, user1.password)
      expect(match).to.equal(true)
    })
    it('testing loginUser with email', async function(){
      const user1 = helper.initialUsers[0]
      const match = await User.loginUser(user1.email, user1.password)
      expect(match).to.equal(true)
    })
  })
})
