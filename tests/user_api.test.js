const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')
const mongoose = require('mongoose')
beforeEach(async () => {
  await User.deleteMany({})
  const userObjects = helper.initialUsers.map(user => new User(user))
  const promiseArray = await userObjects.map(user => user.save())
  await Promise.all(promiseArray)
})

test('all users are returned', async () => {
    try{
        const response = await api.get('/api/users')
        expect(response.body.length).toBe(helper.initialUsers.length)
    }
    catch(error){
        console.log(error)
    }
})

test('ensure a user can be added', async ()=>{
    try{
      const newUser = {
          name: 'Blog blah',
          username: "OOfff123",
          email: "test@email.com",
          password: "12345566"
      }
      const precount = await User.countDocuments()
      await api.post('/api/users').send(newUser)
      const postcount = await User.countDocuments()

      await expect((postcount-precount)).toBe(1)}
    catch(error){
        console.log(error)
    }
})

afterAll(() => {
  mongoose.connection.close()
})