const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator')
var Schema = mongoose.Schema;
const saltrounds = 11


var UserSchema = new Schema({
  name:  String,
  username: {type: String, required: true, unique: true, index: true},
  password: {type: String, required: true, minlength: 8},
  email: {type: String, required: true},
  displayname: String,
  recoveryID: String, // for forget password
  validateID: String  // for registration url
});

UserSchema.pre('save', async function(next){
  try{
    const password = await bcrypt.hash(this.password, saltrounds)
    this.password = password
  }
  catch(err){
    next(err)
  }
})

UserSchema.plugin(uniqueValidator)

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      // the password should not be revealed
      delete returnedObject.password
  }
})

var User = mongoose.model('User', UserSchema)

module.exports = User