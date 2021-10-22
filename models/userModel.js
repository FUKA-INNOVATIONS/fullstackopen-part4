const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    minLength: 3,
    required: true
  },
  name: {
    type: String
  },
  passwordHash: {
    type: String,
    required: true,
    minLength: 3 // minLength doesnt workk
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    //console.log('returned user _id: ', returnedObject._id);
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
    //console.log('returned user id: ', returnedObject.id);
  }
})
userSchema.plugin(uniqueValidator)
const User = mongoose.model('User', userSchema)
module.exports = User


//module.exports = mongoose.model('User', userSchema)
