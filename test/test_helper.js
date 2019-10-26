const mongoose = require('mongoose')
const User = require('../models/user')
initialUsers =[
  {
    username: "user1",
    name: "User Mc1",
    email: "user1@example.com",
    password: "password1"
  },
  {
    username: "user2",
    name: "User Mc2",
    email: "user2@example.com",
    password: "password2"
  },
  {
    username: "user3",
    name: "User Mc3",
    email: "user3@example.com",
    password: "password3"
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}
const connectServer = function(){
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
}

const closeServer = function(){
  mongoose.connection.close()
}

module.exports = {
  initialUsers,
  usersInDb,
  connectServer,
  closeServer
}