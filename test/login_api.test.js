const supertest = require('supertest')
process.env.NODE_ENV = 'test'
const app = require('../app')
const api = supertest.agent(app)
const User = require('../models/user')
const helper = require('./test_helper')
const mongoose = require('mongoose')
var expect = require('chai').expect
var SessionIDCookie;
describe('login/logout api test', function() {
  beforeEach(async function(){
    await User.deleteMany({})
    const userObjects = helper.initialUsers.map(user => new User(user))
    const promiseArray = await userObjects.map(user => user.save())
    await Promise.all(promiseArray)
  })
  describe('login user', function(){
    it('shoould get session saved', async function(){
      // expect(true).to.equal(false)
      const user = helper.initialUsers[0]
      const username = user.username
      const password = user.password
      const result = await api.post('/api/login').send({username: username, password: password})
      console.log(result)
      expect(result.status).to.equal(200)
      expect(result.body.success).to.equal(true)
      // SessionIDCookie = result.headers['set-cookie'].pop().split(';')[0]
      // console.log(result)
      // expect(SessionIDCookie).not.to.equal(undefined)
    })
    it('should have cookie updated', async function(){
      const sessionResult = await api.get('/api/session').set('Cookie',SessionIDCookie)
      // console.log(sessionResult)
      expect(sessionResult.body.login).to.equal(true)
    })
  })
  // describe('creating users', function(){
    
  // })
  
})
