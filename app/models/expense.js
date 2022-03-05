const mongoose = require('mongoose')

const ExpenseSchema = new mongoose.Schema({
  title: {
    type: String, 
    required: true
  }, 
  description: {
    type: String, 
    required: true
  }, 
  type: {
    type: String, 
    required: true
  }, 
  cost: {
    type: String, 
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
  }
},{
  timestamps: true
})

module.exports = mongoose.model('Expense', ExpenseSchema)