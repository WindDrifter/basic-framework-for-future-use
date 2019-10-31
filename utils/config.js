require('dotenv').config()
const MongoMemoryServer = require('mongodb-memory-server')

let PORT = process.env.PORT
const databasename = 'alphatest'
const password = process.env.password
const user = process.env.user
const mongoURL = process.env.mongoURL
let MONGODB_URI = mongoURL ?  `mongodb://${user}:${password}@${mongoURL}` : `mongodb://localhost:27017/${databasename}`
if (process.env.NODE_ENV === 'test') 
  {  
    // using in memory server for test to avoid creating one
    const mongoServer = new MongoMemoryServer.MongoMemoryServer();
    mongoServer.getConnectionString().then((value)=>{
      MONGODB_URI=value
    })
    // MONGODB_URI = `mongodb://localhost:27017/testDB`
  }
const SESSION_SECRET = process.env.session_secret || "bacon"
module.exports = {
  MONGODB_URI,
  PORT,
  SESSION_SECRET
}