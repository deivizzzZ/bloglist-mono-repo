const uniqueValidator = require('mongoose-unique-validator')
const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  blogs: [{
    type: Schema.Types.ObjectId,
    ref: 'Blog'
  }],
  username: {
    type: String,
    unique: true
  },
  name: String,
  password: String
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  }
})

userSchema.plugin(uniqueValidator)

const User = model('User', userSchema)

module.exports = User