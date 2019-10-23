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

  module.exports = {
    initialUsers,
    usersInDb
  }