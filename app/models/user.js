const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  firstName: { 
    type: String, 
    default: 'first name'
  }, 
  lastName: {
    type: String, 
    default: 'last name'
  },
  phone: {
    type: String, 
    default: 'phone number'
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  token: String
}, {
  timestamps: true,
  toJSON: {
    // remove `hashedPassword` field when we call `.toJSON`
    transform: (_doc, user) => {
      delete user.hashedPassword
      return user
    }
  }
})

module.exports = mongoose.model('User', UserSchema)