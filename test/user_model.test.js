const User = require('../models/user')
const mongoose = require('mongoose')
var expect = require('chai').expect
var should = require('chai').should

describe('testing model', ()=>{ 
  before(function(){
    mongoose.connect('mongodb://localhost:27017/test', { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
  })
    .then(() => {
      console.log('connected to MongoDB')
    })
    .catch((error) => {
      console.log('error connection to MongoDB:', error.message)
    })
  })
  beforeEach(async function(){
    await User.deleteMany({})
  })
  
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
  it('ensure unique username', async function(){
    const newUser = {
        name: 'Blog blah',
        username: "OOfff123",
        email: "test@email.com",
        password: "12345566"
    }
    const newUser2 = {
      name: 'User2',
      username: "OOfff123",
      email: "test2@email.com",
      password: "12345566"
    }
    const user = new User(newUser)
    const user2= new User(newUser2)
    await user.save()
    await user2.validate(function(err) {
      expect(err.errors.username).to.exist
    });
  })
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
  after(async function(){
    mongoose.connection.close()
  })
})

