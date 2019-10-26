const mongoose = require('mongoose')
const MongoMemoryServer = require('mongodb-memory-server')
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
const connectServer = async function(){
  const mongoServer = new MongoMemoryServer.MongoMemoryServer();
  const mongoUri = await mongoServer.getConnectionString()
  mongoose.connect(mongoUri, { 
  useNewUrlParser: true,
  useUnifiedTopology: true 
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