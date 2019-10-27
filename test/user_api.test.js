const supertest = require('supertest')
process.env.NODE_ENV = 'test'
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')
const mongoose = require('mongoose')
var expect = require('chai').expect


describe('user api test', function() {
  beforeEach(async function(){
    await User.deleteMany({})
    const userObjects = helper.initialUsers.map(user => new User(user))
    const promiseArray = await userObjects.map(user => user.save())
    await Promise.all(promiseArray)
  })
  describe('getting users', function(){
    it('all users are returned', async function(){
      try{
          const response = await api.get('/api/users')
          expect(response.status).to.equal(200)
          expect(response.body.length).to.equal(helper.initialUsers.length)
      }
      catch(error){
          console.log(error)
      }
    })
    it('ensure when getting user do not return password hash as well', async function(){
      const randomUser = await User.findOne({})
      const userID = randomUser.id
      const response = await api.get(`/api/users/${userID}`)
      expect(response.status).to.equal(200)
      expect(response.body).not.to.equal(undefined)
      expect(response.body.password).to.equal(undefined)
    })
  })
  describe('creating users', function(){
    it('ensure a user can be added', async function(){
      try{
        const newUser = {
            name: 'Blog blah',
            username: "OOfff123",
            email: "test@email.com",
            password: "12345566"
        }
        const precount = await User.countDocuments()
        const response = await api.post('/api/users').send(newUser)
        expect(response.status).to.equal(200)
        const postcount = await User.countDocuments()
        expect(postcount-precount).to.equal(1)
      }
      catch(error){
          console.log(error)
      }
    })
  })
  
})
