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
    it('should not able to access protected route', async function(){
      const result = await api.get('/api/protected')
      // console.log(sessionResult)
      expect(result.status).to.equal(403)
      expect(result.body.message).to.equal('Please Login')
    })
    it('shoould get session saved', async function(){
      // expect(true).to.equal(false)
      const user = helper.initialUsers[0]
      const username = user.username
      const password = user.password
      const result = await api.post('/api/login').send({username: username, password: password})
      SessionIDCookie = result.headers['set-cookie'].pop().split(';')[0]
      // console.log(result)
      expect(SessionIDCookie).not.to.equal(undefined)
    })
    it('should have cookie updated', async function(){
      const sessionResult = await api.get('/api/session').set('Cookie',SessionIDCookie)
      // console.log(sessionResult)
      expect(sessionResult.body.login).to.equal(true)
    })
    it('should able to access protected route', async function(){
      const result = await api.get('/api/protected')
      // console.log(sessionResult)
      expect(result.status).to.equal(200)
      expect(result.body.hello).to.equal('hello, you are protected')
    })
    it('should able to post to protected route', async function(){
      const result = await api.post('/api/protected/testpost').send({test: 1, tet:2})
      // console.log(sessionResult)
      expect(result.status).to.equal(200)
      expect(result.body).to.not.equal(undefined)
    })
  })
  // describe('creating users', function(){
    
  // })
  
})
