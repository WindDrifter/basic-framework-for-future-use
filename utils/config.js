require('dotenv').config()

let PORT = process.env.PORT
const databasename = 'alphatest'
const password = process.env.password
const user = process.env.user
const mongoURL = process.env.mongoURL
const MONGODB_URI = mongoURL ?  `mongodb://${user}:${password}@${mongoURL}` : `mongodb://localhost:27017/${databasename}`
const SESSION_SECRET = process.env.session_secret || "bacon"
module.exports = {
  MONGODB_URI,
  PORT,
  SESSION_SECRET
}