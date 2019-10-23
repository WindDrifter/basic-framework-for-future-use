const User = require('../models/user')
const mongoose = require('mongoose')
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

beforeEach(async () => {
  await User.deleteMany({})
})

test('ensure password is encrypted', async ()=>{
  try{
    const newUser = {
        name: 'Blog blah',
        username: "OOfff123",
        email: "test@email.com",
        password: "12345566"
    }
    const user = new User(newUser)
    await user.save()
    await expect(user.password).not.toBe(undefined)
    await expect(user.password).not.toBe("12345566")
  }
  catch(error){
      console.log(error)
  }
})

afterAll(() => {
  mongoose.connection.close()
})